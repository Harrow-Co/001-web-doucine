<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden flex card-hover">
    <div class="w-20 bg-gradient-to-b from-primary to-primary-600 text-white flex flex-col items-center justify-center py-4">
      <span class="text-2xl font-bold leading-none">{{ day }}</span>
      <span class="text-sm uppercase mt-1">{{ month }}</span>
    </div>
    <div class="flex-1 p-4 relative">
      <h3 class="text-base font-semibold text-gray-700 m-0 mb-3 pr-16">{{ title }}</h3>
      <div class="flex flex-col space-y-2">
        <p class="text-sm text-gray-500 flex items-center m-0">
          <i class="fas fa-map-marker-alt text-primary-600 mr-2 text-xs"></i> {{ location }}
        </p>
        <p class="text-sm text-gray-500 flex items-center m-0">
          <i class="far fa-clock text-primary-600 mr-2 text-xs"></i> {{ time }}
        </p>
      </div>
      <div class="absolute top-4 right-4 flex">
        <button 
          v-if="showViewButton" 
          @click.stop="$emit('view')" 
          class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 mr-2 hover:bg-primary hover:text-white transition-colors duration-200"
          title="Voir les détails"
        >
          <i class="fas fa-eye text-sm"></i>
        </button>
        <button 
          v-if="showEditButton" 
          @click.stop="$emit('edit')" 
          class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors duration-200"
          title="Modifier"
        >
          <i class="fas fa-edit text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    title: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: '-'
    },
    time: {
      type: String,
      default: '-'
    },
    showViewButton: {
      type: Boolean,
      default: true
    },
    showEditButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['view', 'edit']
};
</script> 