// server/auth-module/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

// Étendre l'interface Request d'Express pour inclure l'utilisateur
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware pour vérifier si l'utilisateur est authentifié
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Récupérer le token du header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  // Extraire le token
  const token = authHeader.split(' ')[1];
  
  // Vérifier le token
  const decoded = authService.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Ajouter les informations de l'utilisateur à la requête
  req.user = {
    userId: decoded.userId,
    username: decoded.username,
    role: decoded.role
  };

  next();
};

/**
 * Middleware pour vérifier si l'utilisateur est un administrateur
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin privileges required' });
  }

  next();
};

/**
 * Middleware pour vérifier si l'utilisateur est un éditeur ou un administrateur
 */
export const requireEditor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (req.user.role !== 'editor' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Editor privileges required' });
  }

  next();
};
