/**
 * Script pour désactiver les logs en production
 * À importer au début de l'application (main.js)
 */

// Détection de l'environnement de production
const isProduction = (() => {
  // 1. Vérifier si nous sommes en mode production via Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // Vérifier PROD qui est automatiquement défini par Vite en production
    if (import.meta.env.PROD === true) {
      return true;
    }
    
    // Vérifier si l'URL de l'API pointe vers la production
    if (import.meta.env.VITE_API_URL && 
        import.meta.env.VITE_API_URL.includes('api.association-doucine.fr')) {
      return true;
    }
  }
  
  // 2. Vérifier le domaine actuel (si nous sommes sur le domaine de production)
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    if (hostname === 'association-doucine.fr' || 
        hostname.endsWith('.association-doucine.fr')) {
      return true;
    }
    
    // Exclure explicitement les domaines de développement
    if (hostname === 'localhost' || 
        hostname.includes('127.0.0.1') || 
        hostname.includes('.local') || 
        hostname.includes('192.168.')) {
      return false;
    }
  }
  
  // 3. Par défaut, considérer que nous sommes en développement
  return false;
})();

// Fonction pour déterminer si un message d'erreur est lié à l'authentification
function isAuthError(args) {
  if (!args || args.length === 0) return false;
  
  // Vérifier les messages d'erreur courants liés à l'authentification
  const errorStr = String(args[0]);
  return errorStr.includes('401') || 
         errorStr.includes('Unauthorized') || 
         errorStr.includes('Login error') || 
         errorStr.includes('auth') || 
         errorStr.includes('Auth') || 
         errorStr.includes('token') || 
         errorStr.includes('Token') || 
         errorStr.includes('JWT');
}

// En production, désactive les logs non critiques
if (isProduction) {
  // Sauvegarder les fonctions originales
  const originalConsole = {
    log: console.log,
    info: console.info,
    debug: console.debug,
    warn: console.warn,
    error: console.error
  };
  
  // Remplacer les fonctions de log non critiques
  console.log = function() {};
  console.info = function() {};
  console.debug = function() {};
  console.warn = function() {};
  
  // Conserver console.error mais filtrer les messages sensibles
  console.error = function(...args) {
    // Toujours permettre les erreurs d'authentification et HTTP
    // car elles sont essentielles au fonctionnement de l'application
    if (args.length > 0 && (args[0] instanceof Error || isAuthError(args))) {
      // Utiliser la fonction originale pour les erreurs importantes
      return originalConsole.error.apply(console, args);
    }
    
    // Pour les autres types d'erreurs, ne pas les afficher en production
    // mais ne pas bloquer le flux normal de l'application
  };
}
