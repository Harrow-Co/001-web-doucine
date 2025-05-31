import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

// Interface pour l'utilisateur
export interface User {
  id: string;
  username: string;
  password: string; // Stocké sous forme de hash
  email: string;
  role: 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

// Type pour la création d'utilisateur (sans id, createdAt, updatedAt)
export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// Type pour la mise à jour d'utilisateur (tous les champs sauf id, createdAt, updatedAt sont optionnels)
export type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;

// Type pour la connexion
export interface LoginDto {
  username: string;
  password: string;
}

// Type pour la réponse de connexion
export interface LoginResponseDto {
  token: string;
  user: Omit<User, 'password'>;
}

// Interface pour les requêtes authentifiées
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}
