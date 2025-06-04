import { Router, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateUserDto, LoginDto, AuthenticatedRequest } from './user.model';
import { authenticate, requireAdmin } from './auth.middleware';

const router = Router();
const authService = new AuthService();

// --- Routes d'authentification ---

// POST /api/v2/auth/login - Connexion d'un utilisateur
router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const loginData: LoginDto = req.body;
    
    // Vérifier que tous les champs requis sont présents
    if (!loginData.username || !loginData.password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const result = await authService.login(loginData);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// --- Routes d'administration des utilisateurs (protégées par authentification) ---

// GET /api/v2/auth/users - Récupérer tous les utilisateurs (admin seulement)
router.get('/auth/users', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const users = await authService.findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
});

// GET /api/v2/auth/users/:id - Récupérer un utilisateur spécifique par ID (admin seulement)
router.get('/auth/users/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await authService.findUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
});

// POST /api/v2/auth/users - Créer un nouvel utilisateur (admin seulement)
router.post('/auth/users', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body;
    
    // La validation est gérée dans le service
    const newUser = await authService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  }
});

// PUT /api/v2/auth/users/:id - Mettre à jour un utilisateur existant (admin seulement)
router.put('/auth/users/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userData: UpdateUserDto = req.body;
    const updatedUser = await authService.updateUser(id, userData);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// DELETE /api/v2/auth/users/:id - Supprimer un utilisateur (admin seulement)
router.delete('/auth/users/:id', authenticate, requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await authService.deleteUser(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// GET /api/v2/auth/me - Récupérer les informations de l'utilisateur connecté
router.get('/auth/me', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const user = await authService.findUserById(userId);
    if (user) {
      // Ne pas renvoyer le mot de passe dans la réponse
      // Utiliser le type User pour garantir que password existe
      const userWithPassword = user as any;
      const { password, ...userWithoutPassword } = userWithPassword;
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Failed to retrieve user information' });
  }
});

// Exporter le routeur pour l'intégrer dans l'application Express principale
export default router;
