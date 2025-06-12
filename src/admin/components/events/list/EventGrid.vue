<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
    <div 
      v-for="event in events" 
      :key="event.id" 
      class="bg-white rounded-xl shadow-sm overflow-hidden card-hover"
    >
      <!-- Image de l'événement si disponible -->
      <div v-if="event.image" class="w-full h-40 bg-gray-100 overflow-hidden">
        <img 
          :src="getImageUrl(event.image)" 
          :alt="event.titre" 
          class="w-full h-full object-cover"
          @error="$emit('image-error', $event, event.id)"
        />
      </div>
      
      <div class="p-4 relative">
        <!-- Badge de date -->
        <div class="absolute -top-5 left-4 w-16 h-16 bg-gradient-to-b from-primary to-primary-600 text-white flex flex-col items-center justify-center rounded-lg shadow-md">
          <span class="text-lg font-bold leading-none">{{ formatDay(event.date) }}</span>
          <span class="text-xs uppercase mt-1">{{ formatMonth(event.date) }}</span>
        </div>
        
        <div class="mt-8">
          <h3 class="text-base font-semibold text-gray-700 m-0 mb-3 pr-16 line-clamp-2">{{ event.titre }}</h3>
          
          <div class="flex flex-col space-y-2">
            <p class="text-sm text-gray-500 flex items-center m-0">
              <i class="fas fa-map-marker-alt text-primary-600 mr-2 text-xs"></i> 
              <span class="truncate">{{ event.lieu || 'Lieu non défini' }}</span>
            </p>
            <p class="text-sm text-gray-500 flex items-center m-0">
              <i class="far fa-clock text-primary-600 mr-2 text-xs"></i> {{ event.horaire || 'Horaire non défini' }}
            </p>
            <p v-if="event.description" class="text-sm text-gray-600 mt-2 line-clamp-2">
              {{ event.description }}
            </p>
          </div>
          
          <div class="flex justify-end mt-4">
            <button 
              @click="$emit('view', event.id)" 
              class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 mr-2 hover:bg-primary hover:text-white transition-colors duration-200"
              title="Voir les détails"
            >
              <i class="fas fa-eye text-sm"></i>
            </button>
            <button 
              @click="$emit('edit', event.id)" 
              class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 mr-2 hover:bg-primary hover:text-white transition-colors duration-200"
              title="Modifier"
            >
              <i class="fas fa-edit text-sm"></i>
            </button>
            <button 
              @click="$emit('delete', event)" 
              class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-danger hover:text-white transition-colors duration-200"
              title="Supprimer"
            >
              <i class="fas fa-trash text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '../../../../utils/imageUtils';

export default {
  name: 'EventGrid',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDay(date) {
      if (!date || !date.jour) return '';
      return date.jour;
    },
    
    formatMonth(date) {
      if (!date || !date.mois) return '';
      return date.mois;
    },
    
    getImageUrl
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
