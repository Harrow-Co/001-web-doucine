<template>
  <div class="admin-container">
    <div class="flex justify-between items-center mb-6 flex-wrap">
      <h1 class="text-2xl font-bold text-gray-800 m-0">Détails de l'événement</h1>
      <div class="flex gap-3">
        <router-link :to="{ name: 'admin-events' }" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Retour
        </router-link>
        <router-link :to="{ name: 'admin-event-edit', params: { id: $route.params.id } }" class="btn btn-warning">
          <i class="fas fa-edit"></i> Modifier
        </router-link>
        <button @click="confirmDelete" class="btn btn-danger">
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="card flex flex-col items-center justify-center p-10 text-center mb-6">
      <div class="text-5xl text-primary mb-4">
        <i class="fas fa-spinner animate-spin"></i>
      </div>
      <p class="text-gray-600">Chargement des détails...</p>
    </div>
    
    <div v-else-if="error" class="card flex flex-col items-center justify-center p-10 text-center mb-6">
      <div class="text-5xl text-red-500 mb-4">
        <i class="fas fa-exclamation-circle"></i>
      </div>
      <p class="text-gray-600 mb-6">{{ error }}</p>
      <div class="flex gap-3">
        <button @click="fetchEvent" class="btn btn-secondary">
          Réessayer
        </button>
        <router-link :to="{ name: 'admin-events' }" class="btn btn-primary">
          Retour à la liste
        </router-link>
      </div>
    </div>
    
    <div v-else-if="event">
      <EventDetailCard
        :event="event"
        @image-error="imageError = true"
      />
    </div>
    
    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div class="card w-[450px] max-w-[90%] shadow-xl p-6">
        <h3 class="text-xl font-semibold text-gray-800 m-0 mb-4">Confirmer la suppression</h3>
        <p class="text-gray-600 mb-4">Êtes-vous sûr de vouloir supprimer l'événement "{{ event?.titre }}" ?</p>
        <div class="flex items-center bg-red-50 p-4 rounded-md text-red-500 mb-6">
          <i class="fas fa-exclamation-triangle mr-2"></i>
          <span>Cette action est irréversible.</span>
        </div>
        <div class="flex justify-end gap-3">
          <button @click="cancelDelete" class="btn btn-secondary">
            Annuler
          </button>
          <button @click="deleteEvent" class="btn btn-danger">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventService from '../services/eventService';
import EventDetailCard from '../components/events/EventDetailCard.vue';

export default {
  name: 'EventDetails',
  components: {
    EventDetailCard
  },
  data() {
    return {
      event: null,
      loading: true,
      error: null,
      showDeleteModal: false,
      imageError: false
    };
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    async fetchEvent() {
      this.loading = true;
      this.error = null;
      
      try {
        this.event = await eventService.getEventById(this.$route.params.id);
        if (!this.event) {
          this.error = 'Événement non trouvé';
        }
      } catch (error) {
        console.error('Failed to fetch event:', error);
        this.error = 'Impossible de charger les détails de l\'événement. Veuillez réessayer plus tard.';
      } finally {
        this.loading = false;
      }
    },
    
    confirmDelete() {
      this.showDeleteModal = true;
    },
    
    cancelDelete() {
      this.showDeleteModal = false;
    },
    
    async deleteEvent() {
      try {
        await eventService.deleteEvent(this.event.id);
        this.showDeleteModal = false;
        this.$router.push({ 
          name: 'admin-events',
          params: { message: 'Événement supprimé avec succès' }
        });
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Erreur lors de la suppression de l\'événement');
        this.showDeleteModal = false;
      }
    }
  }
};
</script>

