<template>
  <div class="shadow-sm overflow-hidden">
    <div class="p-8 bg-gradient-to-r from-primary to-primary text-white">
      <h2 class="text-2xl font-bold mb-4">{{ event.titre }}</h2>
      <div class="flex flex-wrap gap-4 text-white opacity-90">
        <p class="flex items-center m-0">
          <i class="fas fa-calendar-alt mr-2"></i> {{ formatDate(event.date) }}
        </p>
        <p class="flex items-center m-0">
          <i class="fas fa-map-marker-alt mr-2"></i> {{ event.lieu }}
        </p>
        <p class="flex items-center m-0">
          <i class="fas fa-clock mr-2"></i> {{ event.horaire }}
        </p>
      </div>
    </div>
    
    <div v-if="event.image" class="w-full h-80 overflow-hidden">
      <img :src="getImageUrl(event.image)" alt="Image de l'événement" class="w-full h-full object-cover" @error="$emit('image-error')">
    </div>
    
    <div class="p-8">
      <h3 class="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-100">Description</h3>
      <p v-if="event.description" class="text-gray-600 whitespace-pre-line leading-relaxed mb-8">{{ event.description }}</p>
      <p v-else class="text-gray-400 italic">Aucune description fournie</p>
      
      <div v-if="event.details" class="mt-8">
        <h3 class="text-xl font-semibold text-primary mb-4 pb-2 border-b border-gray-100">Détails</h3>
        
        <div class="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span class="inline-block w-1 h-4 bg-secondary mr-2 rounded"></span>Destination
          </h4>
          <p class="text-gray-600 mb-2">{{ event.details.destination }}</p>
        </div>
        
        <div class="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span class="inline-block w-1 h-4 bg-secondary mr-2 rounded"></span>Activités
          </h4>
          <ul class="pl-5 space-y-1">
            <li v-for="(activity, index) in event.details.activities" :key="'activity-'+index" class="text-gray-600 relative pl-2">
              <i class="fas fa-circle-dot absolute -left-3 text-secondary text-xs"></i>{{ activity }}
            </li>
          </ul>
        </div>
        
        <div class="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span class="inline-block w-1 h-4 bg-secondary mr-2 rounded"></span>Tarifs
          </h4>
          <ul class="pl-5 space-y-1">
            <li v-for="(price, index) in event.details.pricing" :key="'price-'+index" class="text-gray-600 relative pl-2">
              <i class="fas fa-circle-dot absolute -left-3 text-secondary text-xs"></i>{{ price }}
            </li>
          </ul>
        </div>
        
        <div class="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span class="inline-block w-1 h-4 bg-secondary mr-2 rounded"></span>Inscription
          </h4>
          <p class="text-gray-600 mb-2">Date limite: {{ event.details.registration }}</p>
        </div>
        
        <div class="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span class="inline-block w-1 h-4 bg-secondary mr-2 rounded"></span>Contact
          </h4>
          <p class="text-gray-600 mb-2">Téléphone: {{ event.details.contact }}</p>
          <p class="text-gray-600 mb-2">Email: {{ event.details.email }}</p>
        </div>
        
        <div class="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 class="text-lg font-medium text-gray-800 mb-3 flex items-center">
            <span class="inline-block w-1 h-4 bg-secondary mr-2 rounded"></span>Informations pratiques
          </h4>
          <ul class="pl-5 space-y-1">
            <li v-for="(info, index) in event.details.practicalInfo" :key="'info-'+index" class="text-gray-600 relative pl-2">
              <i class="fas fa-circle-dot absolute -left-3 text-secondary text-xs"></i>{{ info }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-50 border-t border-gray-100 flex justify-between items-center flex-wrap text-sm text-gray-500 p-5">
      <div>
        <p class="m-0 mb-1">Créé le: {{ formatTimestamp(event.createdAt) }}</p>
        <p class="m-0 mb-1">Dernière modification: {{ formatTimestamp(event.updatedAt) }}</p>
      </div>
      <p class="m-0 font-mono bg-gray-100 px-2 py-1 rounded">ID: {{ event.id }}</p>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '../../../utils/imageUtils';

export default {
  name: 'EventDetailCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      // Vérifier si date est un objet avec la structure attendue
      if (!date || !date.jour || !date.mois || !date.annee) {
        console.error('Format de date invalide:', date);
        return 'Date invalide';
      }
      
      // Formater la date selon le format désiré
      return `${date.jour} ${date.mois} ${date.annee}`;
    },
    
    formatTimestamp(dateString) {
      try {
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      } catch (error) {
        console.error('Erreur lors du formatage du timestamp:', error);
        return dateString || 'Date inconnue';
      }
    },
    
    getImageUrl
  }
};
</script>

