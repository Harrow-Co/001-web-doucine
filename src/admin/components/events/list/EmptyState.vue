<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 shadow-sm text-center">
    <i class="fas fa-calendar-times text-5xl text-gray-300 mb-4"></i>
    <p class="text-gray-600 mb-6" v-if="hasSearchQuery">Aucun événement ne correspond à votre recherche.</p>
    <p class="text-gray-600 mb-6" v-else>Aucun événement n'a été trouvé.</p>
    <button 
      @click="$emit('create')" 
      class="px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 bg-primary text-white hover:bg-primary/90 hover:shadow-md"
    >
      <i class="fas fa-plus"></i> Créer votre premier événement
    </button>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    hasSearchQuery: {
      type: Boolean,
      default: false
    }
  }
};
</script>

