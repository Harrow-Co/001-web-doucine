<template>
  <div class="admin-event-details">
    <div class="page-header">
      <h1>Détails de l'événement</h1>
      <div class="actions">
        <button @click="goBack" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Retour
        </button>
        <button @click="editEvent" class="btn btn-warning">
          <i class="fas fa-edit"></i> Modifier
        </button>
        <button @click="confirmDelete" class="btn btn-danger">
          <i class="fas fa-trash"></i> Supprimer
        </button>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      <p>Chargement des détails...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchEvent" class="btn btn-secondary">Réessayer</button>
      <button @click="goBack" class="btn btn-primary">Retour à la liste</button>
    </div>
    
    <div v-else-if="event" class="event-card">
      <div class="event-header">
        <h2>{{ event.title }}</h2>
        <div class="event-meta">
          <p class="event-date">
            <i class="fas fa-calendar-alt"></i> {{ formatDate(event.date) }}
          </p>
          <p class="event-location">
            <i class="fas fa-map-marker-alt"></i> {{ event.location }}
          </p>
        </div>
      </div>
      
      <div class="event-body">
        <h3>Description</h3>
        <p v-if="event.description" class="event-description">{{ event.description }}</p>
        <p v-else class="no-content">Aucune description fournie</p>
      </div>
      
      <div class="event-footer">
        <div class="event-timestamps">
          <p>Créé le: {{ formatTimestamp(event.createdAt) }}</p>
          <p>Dernière modification: {{ formatTimestamp(event.updatedAt) }}</p>
        </div>
        <p class="event-id">ID: {{ event.id }}</p>
      </div>
    </div>
    
    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="modal-backdrop">
      <div class="modal-content">
        <h3>Confirmer la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer l'événement "{{ event?.title }}" ?</p>
        <p class="warning">Cette action est irréversible.</p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="btn btn-secondary">Annuler</button>
          <button @click="deleteEvent" class="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventService from '../services/eventService';

export default {
  name: 'EventDetails',
  data() {
    return {
      event: null,
      loading: true,
      error: null,
      showDeleteModal: false
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
    
    formatDate(dateString) {
      const options = { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    
    formatTimestamp(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    },
    
    goBack() {
      this.$router.push({ name: 'admin-events' });
    },
    
    editEvent() {
      this.$router.push({ name: 'admin-event-edit', params: { id: this.event.id } });
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

<style scoped>
.admin-event-details {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

h1 {
  margin: 0;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
}

.loading, .error {
  text-align: center;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin: 20px 0;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.event-card {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.event-header {
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.event-header h2 {
  margin: 0 0 15px 0;
  color: #333;
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 16px;
  color: #666;
}

.event-meta i {
  margin-right: 5px;
}

.event-body {
  padding: 20px;
}

.event-body h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.event-description {
  white-space: pre-line;
  line-height: 1.6;
}

.no-content {
  color: #999;
  font-style: italic;
}

.event-footer {
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  font-size: 14px;
  color: #777;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.event-timestamps p {
  margin: 5px 0;
}

.event-id {
  font-family: monospace;
  margin: 5px 0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
}

.btn i {
  margin-right: 5px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
}

.btn-secondary:hover {
  background-color: #ddd;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #d32f2f;
}

.btn-warning {
  background-color: #ff9800;
  color: white;
}

.btn-warning:hover {
  background-color: #f57c00;
}

/* Modal styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  max-width: 90%;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content .warning {
  color: #f44336;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-actions button {
  margin-left: 10px;
}

@media (max-width: 600px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .actions {
    margin-top: 15px;
  }
  
  .event-meta {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
