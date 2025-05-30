<template>
  <div class="admin-event-list">
    <h1>Gestion des Événements</h1>
    
    <div class="actions">
      <button class="btn btn-primary" @click="navigateToCreate">
        <i class="fas fa-plus"></i> Nouvel Événement
      </button>
    </div>

    <div v-if="loading" class="loading">
      <p>Chargement des événements...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Erreur lors du chargement des événements: {{ error }}</p>
      <button @click="fetchEvents" class="btn btn-secondary">Réessayer</button>
    </div>

    <div v-else-if="events.length === 0" class="empty-state">
      <p>Aucun événement n'a été trouvé.</p>
      <button @click="navigateToCreate" class="btn btn-primary">Créer votre premier événement</button>
    </div>

    <div v-else class="events-table-container">
      <table class="events-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date</th>
            <th>Lieu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.titre }}</td>
            <td>{{ formatDate(event.date) }}</td>
            <td>{{ event.lieu }}</td>
            <td class="actions">
              <button @click="viewEvent(event.id)" class="btn btn-sm btn-info" title="Voir les détails">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="editEvent(event.id)" class="btn btn-sm btn-warning" title="Modifier">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="confirmDelete(event)" class="btn btn-sm btn-danger" title="Supprimer">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="modal-backdrop">
      <div class="modal-content">
        <h3>Confirmer la suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer l'événement "{{ eventToDelete?.titre }}" ?</p>
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
  name: 'EventList',
  data() {
    return {
      events: [],
      loading: true,
      error: null,
      showDeleteModal: false,
      eventToDelete: null
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      this.loading = true;
      this.error = null;
      
      try {
        this.events = await eventService.getAllEvents();
      } catch (error) {
        console.error('Failed to fetch events:', error);
        this.error = 'Impossible de charger les événements. Veuillez réessayer plus tard.';
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(date) {
      // Log pour débogage
      console.log('Date reçue:', date);
      
      // Vérifier si date est un objet avec la structure attendue (format de notre nouvelle API)
      if (date && date.jour && date.mois && date.annee) {
        return `${date.jour} ${date.mois} ${date.annee}`;
      }
      
      // Si date est une chaîne ISO (format Strapi ou autre)
      if (date && typeof date === 'string') {
        try {
          const dateObj = new Date(date);
          if (!isNaN(dateObj.getTime())) {
            const jour = dateObj.getDate().toString().padStart(2, '0');
            const mois = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'][dateObj.getMonth()];
            const annee = dateObj.getFullYear();
            return `${jour} ${mois} ${annee}`;
          }
        } catch (e) {
          console.error('Erreur lors du parsing de la date:', e);
        }
      }
      
      // Si c'est un objet avec une structure différente
      if (date && typeof date === 'object') {
        console.error('Structure de date non reconnue:', date);
        // Tentative d'extraction des informations de date
        const dateStr = JSON.stringify(date);
        return `Date (format non standard): ${dateStr.substring(0, 30)}${dateStr.length > 30 ? '...' : ''}`;
      }
      
      console.error('Format de date invalide:', date);
      return 'Date invalide';
    },
    
    navigateToCreate() {
      this.$router.push({ name: 'admin-event-create' });
    },
    
    viewEvent(id) {
      this.$router.push({ name: 'admin-event-details', params: { id } });
    },
    
    editEvent(id) {
      this.$router.push({ name: 'admin-event-edit', params: { id } });
    },
    
    confirmDelete(event) {
      this.eventToDelete = event;
      this.showDeleteModal = true;
    },
    
    cancelDelete() {
      this.showDeleteModal = false;
      this.eventToDelete = null;
    },
    
    async deleteEvent() {
      if (!this.eventToDelete) return;
      
      try {
        await eventService.deleteEvent(this.eventToDelete.id);
        // Retirer l'événement de la liste locale
        this.events = this.events.filter(e => e.id !== this.eventToDelete.id);
        this.showDeleteModal = false;
        this.eventToDelete = null;
        
        // Afficher un message de succès (vous pourriez utiliser une bibliothèque de notifications)
        alert('Événement supprimé avec succès');
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Erreur lors de la suppression de l\'événement');
      }
    }
  }
};
</script>

<style scoped>
.admin-event-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.actions {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
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

.btn-info {
  background-color: #2196F3;
  color: white;
}

.btn-info:hover {
  background-color: #1976D2;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.8rem;
}

.loading, .error, .empty-state {
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

.events-table-container {
  overflow-x: auto;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.events-table th, .events-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.events-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.events-table tr:hover {
  background-color: #f5f5f5;
}

.events-table td.actions {
  white-space: nowrap;
  width: 150px;
}

.events-table td.actions button {
  margin-right: 5px;
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
</style>
