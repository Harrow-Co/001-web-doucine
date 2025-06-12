<template>
  <div class="error-container">
    <i class="fas fa-exclamation-circle"></i>
    <p>{{ errorMessage }}</p>
    <button @click="$emit('retry')" class="btn btn-secondary">
      <i class="fas fa-sync-alt"></i> Réessayer
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorState',
  props: {
    errorMessage: {
      type: String,
      default: 'Une erreur est survenue lors du chargement des données.'
    }
  }
};
</script>

