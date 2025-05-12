<template>
  <div class="admin-event-form">
    <h1>{{ isEditing ? 'Modifier l\'événement' : 'Créer un nouvel événement' }}</h1>
    
    <div v-if="loading" class="loading">
      <p>Chargement des données...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="goBack" class="btn btn-secondary">Retour</button>
    </div>
    
    <form v-else @submit.prevent="saveEvent" class="event-form">
      <div class="form-group">
        <label for="title">Titre *</label>
        <input 
          id="title" 
          v-model="form.title" 
          type="text" 
          required 
          class="form-control"
          :class="{ 'is-invalid': validationErrors.title }"
        >
        <div v-if="validationErrors.title" class="invalid-feedback">
          {{ validationErrors.title }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="date">Date et heure *</label>
        <input 
          id="date" 
          v-model="form.date" 
          type="datetime-local" 
          required 
          class="form-control"
          :class="{ 'is-invalid': validationErrors.date }"
        >
        <div v-if="validationErrors.date" class="invalid-feedback">
          {{ validationErrors.date }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="location">Lieu *</label>
        <input 
          id="location" 
          v-model="form.location" 
          type="text" 
          required 
          class="form-control"
          :class="{ 'is-invalid': validationErrors.location }"
        >
        <div v-if="validationErrors.location" class="invalid-feedback">
          {{ validationErrors.location }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea 
          id="description" 
          v-model="form.description" 
          rows="5" 
          class="form-control"
          :class="{ 'is-invalid': validationErrors.description }"
        ></textarea>
        <div v-if="validationErrors.description" class="invalid-feedback">
          {{ validationErrors.description }}
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="goBack" class="btn btn-secondary">Annuler</button>
        <button type="submit" class="btn btn-primary" :disabled="saving">
          <span v-if="saving">Enregistrement...</span>
          <span v-else>{{ isEditing ? 'Mettre à jour' : 'Créer' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import eventService from '../services/eventService';

export default {
  name: 'EventForm',
  data() {
    return {
      form: {
        title: '',
        date: '',
        location: '',
        description: ''
      },
      originalEvent: null,
      loading: false,
      saving: false,
      error: null,
      validationErrors: {}
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    }
  },
  created() {
    if (this.isEditing) {
      this.fetchEvent();
    } else {
      // Pour un nouvel événement, initialiser la date à aujourd'hui
      const now = new Date();
      // Format YYYY-MM-DDThh:mm
      this.form.date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
  },
  methods: {
    async fetchEvent() {
      this.loading = true;
      this.error = null;
      
      try {
        const event = await eventService.getEventById(this.$route.params.id);
        this.originalEvent = event;
        
        // Formater la date pour l'input datetime-local
        const eventDate = new Date(event.date);
        const formattedDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}T${String(eventDate.getHours()).padStart(2, '0')}:${String(eventDate.getMinutes()).padStart(2, '0')}`;
        
        this.form = {
          title: event.title,
          date: formattedDate,
          location: event.location || '',
          description: event.description || ''
        };
      } catch (error) {
        console.error('Failed to fetch event:', error);
        this.error = 'Impossible de charger les détails de l\'événement. Veuillez réessayer plus tard.';
      } finally {
        this.loading = false;
      }
    },
    
    validateForm() {
      this.validationErrors = {};
      let isValid = true;
      
      if (!this.form.title.trim()) {
        this.validationErrors.title = 'Le titre est requis';
        isValid = false;
      }
      
      if (!this.form.date) {
        this.validationErrors.date = 'La date est requise';
        isValid = false;
      }
      
      if (!this.form.location.trim()) {
        this.validationErrors.location = 'Le lieu est requis';
        isValid = false;
      }
      
      return isValid;
    },
    
    async saveEvent() {
      if (!this.validateForm()) {
        return;
      }
      
      this.saving = true;
      
      try {
        const eventData = {
          title: this.form.title.trim(),
          date: new Date(this.form.date).toISOString(),
          location: this.form.location.trim(),
          description: this.form.description.trim()
        };
        
        if (this.isEditing) {
          await eventService.updateEvent(this.$route.params.id, eventData);
          this.$router.push({ name: 'admin-event-details', params: { id: this.$route.params.id } });
        } else {
          const newEvent = await eventService.createEvent(eventData);
          this.$router.push({ name: 'admin-event-details', params: { id: newEvent.id } });
        }
      } catch (error) {
        console.error('Failed to save event:', error);
        this.error = `Erreur lors de ${this.isEditing ? 'la mise à jour' : 'la création'} de l'événement. Veuillez réessayer.`;
      } finally {
        this.saving = false;
      }
    },
    
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.admin-event-form {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  color: #333;
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

.event-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-control:focus {
  border-color: #4CAF50;
  outline: none;
}

.is-invalid {
  border-color: #f44336;
}

.invalid-feedback {
  color: #f44336;
  font-size: 14px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  margin-left: 10px;
}

.btn-primary:hover:not(:disabled) {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #f1f1f1;
  color: #333;
}

.btn-secondary:hover {
  background-color: #ddd;
}
</style>
