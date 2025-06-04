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

// En production, désactive tous les logs
if (isProduction) {
  // Sauvegarde des fonctions originales (uniquement pour console.error)
  const originalError = console.error;
  
  // Remplace toutes les fonctions de log par des fonctions vides
  console.log = function() {};
  console.info = function() {};
  console.debug = function() {};
  console.warn = function() {};
  console.trace = function() {};
  console.table = function() {};
  console.count = function() {};
  console.countReset = function() {};
  console.group = function() {};
  console.groupCollapsed = function() {};
  console.groupEnd = function() {};
  console.time = function() {};
  console.timeLog = function() {};
  console.timeEnd = function() {};
  console.timeStamp = function() {};
  console.profile = function() {};
  console.profileEnd = function() {};
  console.assert = function() {};
  console.clear = function() {};
  
  // Garde la fonction d'erreur mais avec moins d'informations
  console.error = function() {
    originalError('Une erreur est survenue. Consultez les logs du serveur pour plus de détails.');
  };
 
}
