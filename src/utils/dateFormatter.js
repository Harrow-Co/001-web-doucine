/**
 * Utilitaires pour le formatage des dates
 */

/**
 * Obtient l'abréviation française d'un mois à partir de son index
 * @param {number} monthIndex - Index du mois (0-11)
 * @returns {string} - Abréviation du mois en français
 */
export const getMonthAbbreviation = (monthIndex) => {
  const abbreviations = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
  return abbreviations[monthIndex];
};

/**
 * Obtient le nom complet français d'un mois à partir de son index
 * @param {number} monthIndex - Index du mois (0-11)
 * @returns {string} - Nom du mois en français
 */
export const getMonthName = (monthIndex) => {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months[monthIndex];
};

/**
 * Formate une date ISO en format français
 * @param {string} isoDate - Date au format ISO
 * @param {Object} options - Options de formatage
 * @returns {string} - Date formatée
 */
export const formatDate = (isoDate, options = {}) => {
  const date = new Date(isoDate);
  
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  
  if (options.abbreviation) {
    return `${day} ${getMonthAbbreviation(monthIndex)} ${year}`;
  }
  
  return `${day} ${getMonthName(monthIndex)} ${year}`;
};

/**
 * Formate une date pour l'affichage dans les événements (avec jour de semaine)
 * @param {string} isoDate - Date au format ISO
 * @returns {string} - Date formatée avec jour de la semaine
 */
export const formatEventDate = (isoDate) => {
  const date = new Date(isoDate);
  
  const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const dayOfWeek = dayNames[date.getDay()];
  
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  
  return `${dayOfWeek} ${day} ${getMonthName(monthIndex)} ${year}`;
};

export default {
  getMonthAbbreviation,
  getMonthName,
  formatDate,
  formatEventDate
}; 