export const events = [
  {
    id: "1",
    titre: "Balade en Famille à Sinnamary",
    description: "Une sortie détente à l'îlot des caïmans avec visite guidée et repas inclus. Un moment convivial à partager en famille.",
    horaire: "7h00 - 16h00",
    lieu: "Départ de Family Plaza, destination Sinnamary",
    date: {
      jour: "29",
      mois: "MAR",
      annee: "2025"
    },
    image: require('@/assets/images/PHOTO-2025-03-13-20-39-40.jpg'),
    details: {
      destination: "Îlot des Caïmans à Sinnamary",
      activities: ["Visite des caïmans", "Détente", "Restauration"],
      pricing: ["50€ par adulte", "30€ par enfant", "Transport inclus"],
      registration: "19/03/2025",
      contact: "0690 26 30 33",
      email: "doucine97351@gmail.com",
      practicalInfo: ["Départ en bus à 7h", "Retour prévu à 16h"]
    }
  },
  {
    id: "2",
    titre: "Génér'Action Bien-Être",
    description: "Deux journées axées sur la relaxation, le bien-être et le lien intergénérationnel, à travers ateliers sensoriels et séance cinéma.",
    horaire: "8h30 - 16h00 / à partir de 9h",
    lieu: "Matoury - Maison des Associations et Cinéma Agora",
    date: {
      jour: "26",
      mois: "APR",
      annee: "2025"
    },
    image: require('@/assets/images/IMG_8170.jpg'),
    details: {
      destination: "Maison des Associations & Family Plaza Agora",
      activities: [
        "Découverte de la réflexologie",
        "Atelier d’auto-massage",
        "Atelier sensoriel",
        "Atelier créatif",
        "Séance cinéma intergénérationnelle"
      ],
      pricing: ["15€ pour le 26 avril", "10€ pour le 2 mai"],
      registration: "25/04/2025",
      contact: "0690 26 30 33",
      email: "doucine97351@gmail.com",
      practicalInfo: ["Repas et collation inclus", "Tenue confortable recommandée"]
    }
  }
];


export default events; 