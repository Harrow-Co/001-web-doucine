import authDb from './auth.db';
import { User, CreateUserDto, UpdateUserDto, LoginDto } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as sqlite3 from 'sqlite3';

// Étendre l'interface Statement pour inclure la propriété 'changes'
declare module 'sqlite3' {
  interface Statement {
    changes: number;
    lastID: number;
  }
}

// Fonction pour obtenir la date et l'heure actuelles au format ISO
const getCurrentISOTime = (): string => {
  try {
    return new Date().toISOString();
  } catch (error) {
    console.error('Erreur lors de la conversion de la date en ISO string:', error);
    // Fallback: retourner une chaîne de date formatée manuellement
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.000Z`;
  }
};

export class AuthService {
  private readonly saltRounds = 10;
  private readonly jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret_change_in_production';
  private readonly tokenExpiration = '24h';

  /**
   * Crée un nouvel utilisateur dans la base de données.
   * @param userData Données pour le nouvel utilisateur.
   * @returns L'utilisateur créé (sans le mot de passe).
   */
  async createUser(userData: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Vérifier que tous les champs requis sont présents
    if (!userData.username) {
      throw new Error('Le champ username est requis');
    }
    
    if (!userData.password) {
      throw new Error('Le champ password est requis');
    }
    
    if (!userData.email) {
      throw new Error('Le champ email est requis');
    }
    
    if (!userData.role || !['admin', 'editor'].includes(userData.role)) {
      throw new Error('Le champ role est requis et doit être "admin" ou "editor"');
    }

    // Hacher le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);
    
    const newUser: User = {
      ...userData,
      password: hashedPassword,
      id: uuidv4(), // Génère un ID unique
      createdAt: getCurrentISOTime(),
      updatedAt: getCurrentISOTime(),
    };

    const sql = `INSERT INTO users (
      id, username, password, email, role, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
      authDb.run(sql, [
        newUser.id,
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.role,
        newUser.createdAt,
        newUser.updatedAt
      ], (err: Error | null) => {
        if (err) {
          console.error('Error creating user:', err.message);
          reject(new Error('Failed to create user'));
        } else {
          // Retourne l'objet de l'utilisateur créé sans le mot de passe
          const { password, ...userWithoutPassword } = newUser;
          resolve(userWithoutPassword);
        }
      });
    });
  }

  /**
   * Récupère tous les utilisateurs de la base de données.
   * @returns Une liste de tous les utilisateurs (sans les mots de passe).
   */
  async findAllUsers(): Promise<Omit<User, 'password'>[]> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users ORDER BY createdAt DESC`;

      authDb.all(sql, [], (err: Error | null, rows: any[]) => {
        if (err) {
          console.error('Error fetching all users:', err.message);
          reject(new Error('Failed to retrieve users'));
        } else {
          // Supprimer les mots de passe des résultats
          const users = rows.map(row => {
            const { password, ...userWithoutPassword } = row;
            return userWithoutPassword;
          });
          
          resolve(users);
        }
      });
    });
  }

  /**
   * Trouve un utilisateur par son ID.
   * @param id L'ID de l'utilisateur à trouver.
   * @returns L'utilisateur trouvé (sans le mot de passe) ou null s'il n'existe pas.
   */
  async findUserById(id: string): Promise<Omit<User, 'password'> | null> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id = ?`;

      authDb.get(sql, [id], (err: Error | null, row: any) => {
        if (err) {
          console.error(`Error finding user by id ${id}:`, err.message);
          reject(new Error(`Failed to retrieve user ${id}`));
        } else if (!row) {
          resolve(null); // Aucun utilisateur trouvé
        } else {
          // Supprimer le mot de passe du résultat
          const { password, ...userWithoutPassword } = row;
          resolve(userWithoutPassword);
        }
      });
    });
  }

  /**
   * Trouve un utilisateur par son nom d'utilisateur.
   * @param username Le nom d'utilisateur à rechercher.
   * @returns L'utilisateur complet (avec le mot de passe) ou null s'il n'existe pas.
   */
  private async findUserByUsername(username: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE username = ?`;

      authDb.get(sql, [username], (err: Error | null, row: any) => {
        if (err) {
          console.error(`Error finding user by username ${username}:`, err.message);
          reject(new Error(`Failed to retrieve user ${username}`));
        } else if (!row) {
          resolve(null); // Aucun utilisateur trouvé
        } else {
          resolve(row as User);
        }
      });
    });
  }

  /**
   * Met à jour un utilisateur existant.
   * @param id L'ID de l'utilisateur à mettre à jour.
   * @param userData Les données à mettre à jour.
   * @returns L'utilisateur mis à jour (sans le mot de passe) ou null s'il n'existe pas.
   */
  async updateUser(id: string, userData: UpdateUserDto): Promise<Omit<User, 'password'> | null> {
    // Vérifier d'abord si l'utilisateur existe
    const existingUser = await this.findUserById(id);
    if (!existingUser) {
      return null;
    }

    // Si le mot de passe est fourni, le hacher
    let hashedPassword: string | undefined;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);
    }

    // Préparer les données pour la mise à jour
    const updatedFields: Record<string, any> = { ...userData };
    if (hashedPassword) {
      updatedFields.password = hashedPassword;
    }
    updatedFields.updatedAt = getCurrentISOTime();

    // Construire la requête SQL dynamiquement en fonction des champs fournis
    const fields = Object.keys(updatedFields).filter(key => key !== 'id');
    const placeholders = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => updatedFields[field]);
    
    const sql = `UPDATE users SET ${placeholders} WHERE id = ?`;
    values.push(id);

    return new Promise((resolve, reject) => {
      authDb.run(sql, values, async (err: Error | null) => {
        if (err) {
          console.error('Error updating user:', err.message);
          return reject(err);
        }

        // Récupérer l'utilisateur mis à jour
        const updatedUser = await this.findUserById(id);
        resolve(updatedUser);
      });
    });
  }

  /**
   * Supprime un utilisateur par son ID.
   * @param id L'ID de l'utilisateur à supprimer.
   * @returns true si la suppression a réussi, false sinon.
   */
  async deleteUser(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM users WHERE id = ?`;
      authDb.run(sql, [id], function (this: sqlite3.Statement, err: Error | null) {
        if (err) {
          console.error('Error deleting user:', err.message);
          return reject(err);
        }
        // this.changes contient le nombre de lignes affectées
        resolve(this.changes > 0);
      });
    });
  }

  /**
   * Authentifie un utilisateur et génère un token JWT.
   * @param loginData Les données de connexion (nom d'utilisateur et mot de passe).
   * @returns Un objet contenant le token JWT et les informations de l'utilisateur (sans le mot de passe).
   */
  async login(loginData: LoginDto): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const { username, password } = loginData;
    
    // Trouver l'utilisateur par son nom d'utilisateur
    const user = await this.findUserByUsername(username);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }
    
    // Générer un token JWT
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        role: user.role 
      },
      this.jwtSecret,
      { expiresIn: this.tokenExpiration }
    );
    
    return {
      token,
      user: userWithoutPassword
    };
  }

  /**
   * Vérifie si un token JWT est valide.
   * @param token Le token JWT à vérifier.
   * @returns Les données décodées du token si valide, sinon null.
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      return null;
    }
  }
}
