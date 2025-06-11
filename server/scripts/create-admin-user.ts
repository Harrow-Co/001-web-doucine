// server/scripts/create-admin-user.ts
import { AuthService } from '../auth-module/auth.service';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const createAdminUser = async () => {
  try {
    const authService = new AuthService();
    
    // Définir les informations de l'administrateur par défaut
    // Dans un environnement de production, ces valeurs devraient venir des variables d'environnement
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@association-doucine.fr';
    
    console.log('Création de l\'utilisateur administrateur par défaut...');
    
    // Vérifier si un utilisateur avec ce nom d'utilisateur existe déjà
    try {
      // Tenter de se connecter avec les identifiants admin
      await authService.login({
        username: adminUsername,
        password: adminPassword
      });
      console.log('L\'utilisateur administrateur existe déjà.');
      return;
    } catch (error) {
      // Si la connexion échoue, cela signifie que l'utilisateur n'existe pas ou que le mot de passe est incorrect
      console.log('Création d\'un nouvel utilisateur administrateur...');
      
      // Créer l'utilisateur administrateur
      const adminUser = await authService.createUser({
        username: adminUsername,
        password: adminPassword,
        email: adminEmail,
        role: 'admin'
      });
      
      console.log('Utilisateur administrateur créé avec succès:', adminUser.username);
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur administrateur:', error);
  } finally {
    // Fermer la connexion à la base de données
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  }
};

// Exécuter la fonction
createAdminUser();
