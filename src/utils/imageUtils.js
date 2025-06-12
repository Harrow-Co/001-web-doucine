/**
 * Utilitaires pour la gestion des images
 */

// Configuration de l'URL de l'API selon l'environnement
let API_URL = import.meta.env.VITE_API_URL || '/api/v2';

// En mode développement, utiliser localhost
if (import.meta.env.DEV) {
  API_URL = 'http://localhost:3000/api/v2';
}

/**
 * Convertit un chemin d'image relatif en URL complète selon l'environnement
 * @param {string} imagePath - Chemin de l'image
 * @returns {string} URL complète de l'image
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  
  // Si c'est déjà une URL complète, la retourner telle quelle
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Si c'est un chemin relatif commençant par /uploads
  if (imagePath.startsWith('/uploads')) {
    // En mode développement, utiliser localhost
    if (import.meta.env.DEV) {
      return `http://localhost:3000${imagePath}`;
    } else {
      // En production, utiliser l'URL de base de l'API sans le préfixe /api/v2
      const baseUrl = API_URL.replace('/api/v2', '');
      return `${baseUrl}${imagePath}`;
    }
  }
  
  // Sinon, retourner le chemin tel quel
  return imagePath;
}

/**
 * Configuration de l'API pour les requêtes
 */
export const apiConfig = {
  /**
   * Obtient l'URL de l'API
   * @returns {string} URL de l'API
   */
  getApiUrl() {
    return API_URL;
  },
  
  /**
   * Obtient l'URL de base (sans le préfixe /api/v2)
   * @returns {string} URL de base
   */
  getBaseUrl() {
    return API_URL.replace('/api/v2', '');
  }
};
