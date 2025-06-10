<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal-content max-w-lg">
      <div class="bg-gray-50 p-5 flex justify-between items-center border-b border-gray-200 -mx-6 -mt-6 mb-6 rounded-t-xl">
        <h3 class="modal-title m-0">Confirmer la suppression</h3>
        <button class="bg-transparent border-0 text-gray-500 text-lg cursor-pointer transition-colors duration-200 hover:text-danger" @click="$emit('cancel')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="text-center">
        <div class="text-5xl text-secondary mb-4">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <p class="m-0 mb-6 text-gray-700">Êtes-vous sûr de vouloir supprimer l'événement "<strong>{{ event?.titre }}</strong>" ?</p>
        <div class="flex items-center bg-red-50 p-4 rounded-md text-danger">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          <span>Cette action est irréversible.</span>
        </div>
      </div>
      <div class="modal-actions bg-gray-50 p-5 -mx-6 -mb-6 mt-6 border-t border-gray-200 rounded-b-xl">
        <button 
          @click="$emit('cancel')" 
          class="btn btn-secondary"
        >
          <i class="fas fa-times"></i> Annuler
        </button>
        <button 
          @click="$emit('confirm')" 
          class="btn btn-danger"
        >
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: {
    event: {
      type: Object,
      default: null
    }
  }
};
</script>

