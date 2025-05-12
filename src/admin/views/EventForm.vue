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
      <!-- Informations de base -->  
      <h3>Informations de base</h3>
      <div class="form-group">
        <label for="titre">Titre *</label>
        <input 
          id="titre" 
          v-model="form.titre" 
          type="text" 
          required 
          class="form-control"
          :class="{ 'is-invalid': validationErrors.titre }"
        >
        <div v-if="validationErrors.titre" class="invalid-feedback">
          {{ validationErrors.titre }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="description">Description *</label>
        <textarea 
          id="description" 
          v-model="form.description" 
          rows="3" 
          required
          class="form-control"
          :class="{ 'is-invalid': validationErrors.description }"
        ></textarea>
        <div v-if="validationErrors.description" class="invalid-feedback">
          {{ validationErrors.description }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="horaire">Horaire *</label>
        <input 
          id="horaire" 
          v-model="form.horaire" 
          type="text" 
          required 
          placeholder="Ex: 7h00 - 16h00"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.horaire }"
        >
        <div v-if="validationErrors.horaire" class="invalid-feedback">
          {{ validationErrors.horaire }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="lieu">Lieu *</label>
        <input 
          id="lieu" 
          v-model="form.lieu" 
          type="text" 
          required 
          placeholder="Ex: Départ de Family Plaza, destination Sinnamary"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.lieu }"
        >
        <div v-if="validationErrors.lieu" class="invalid-feedback">
          {{ validationErrors.lieu }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="image">Image (URL, optionnelle)</label>
        <input 
          id="image" 
          v-model="form.image" 
          type="text" 
          placeholder="Ex: https://example.com/image.jpg"
          class="form-control"
        >
        <small class="form-text text-muted">Entrez l'URL d'une image pour illustrer l'événement.</small>
      </div>
      
      <!-- Date de l'événement -->
      <h3>Date de l'événement</h3>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="date-jour">Jour *</label>
          <input 
            id="date-jour" 
            v-model="form.date.jour" 
            type="text" 
            required 
            placeholder="Ex: 29"
            class="form-control"
            :class="{ 'is-invalid': validationErrors.dateJour }"
          >
          <div v-if="validationErrors.dateJour" class="invalid-feedback">
            {{ validationErrors.dateJour }}
          </div>
        </div>
        
        <div class="form-group col-md-4">
          <label for="date-mois">Mois (abrégé) *</label>
          <select 
            id="date-mois" 
            v-model="form.date.mois" 
            required 
            class="form-control"
            :class="{ 'is-invalid': validationErrors.dateMois }"
          >
            <option value="">Sélectionner...</option>
            <option value="JAN">JAN</option>
            <option value="FEV">FEV</option>
            <option value="MAR">MAR</option>
            <option value="AVR">AVR</option>
            <option value="MAI">MAI</option>
            <option value="JUN">JUN</option>
            <option value="JUL">JUL</option>
            <option value="AOU">AOU</option>
            <option value="SEP">SEP</option>
            <option value="OCT">OCT</option>
            <option value="NOV">NOV</option>
            <option value="DEC">DEC</option>
          </select>
          <div v-if="validationErrors.dateMois" class="invalid-feedback">
            {{ validationErrors.dateMois }}
          </div>
        </div>
        
        <div class="form-group col-md-4">
          <label for="date-annee">Année *</label>
          <input 
            id="date-annee" 
            v-model="form.date.annee" 
            type="text" 
            required 
            placeholder="Ex: 2025"
            class="form-control"
            :class="{ 'is-invalid': validationErrors.dateAnnee }"
          >
          <div v-if="validationErrors.dateAnnee" class="invalid-feedback">
            {{ validationErrors.dateAnnee }}
          </div>
        </div>
      </div>
      
      <!-- Détails de l'événement -->
      <h3>Détails de l'événement</h3>
      <div class="form-group">
        <label for="destination">Destination *</label>
        <input 
          id="destination" 
          v-model="form.details.destination" 
          type="text" 
          required 
          placeholder="Ex: Îlot des Caïmans à Sinnamary"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.destination }"
        >
        <div v-if="validationErrors.destination" class="invalid-feedback">
          {{ validationErrors.destination }}
        </div>
      </div>
      
      <div class="form-group">
        <label>Activités *</label>
        <div class="array-inputs">
          <div v-for="(activity, index) in form.details.activities" :key="'activity-'+index" class="array-input-row">
            <input 
              :id="'activity-'+index" 
              v-model="form.details.activities[index]" 
              type="text" 
              class="form-control"
              placeholder="Ex: Visite des caïmans"
            >
            <button type="button" class="btn btn-danger btn-sm" @click="removeActivity(index)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" @click="addActivity">
            <i class="fas fa-plus"></i> Ajouter une activité
          </button>
        </div>
        <div v-if="validationErrors.activities" class="invalid-feedback d-block">
          {{ validationErrors.activities }}
        </div>
      </div>
      
      <div class="form-group">
        <label>Tarifs *</label>
        <div class="array-inputs">
          <div v-for="(price, index) in form.details.pricing" :key="'price-'+index" class="array-input-row">
            <input 
              :id="'price-'+index" 
              v-model="form.details.pricing[index]" 
              type="text" 
              class="form-control"
              placeholder="Ex: 50€ par adulte"
            >
            <button type="button" class="btn btn-danger btn-sm" @click="removePricing(index)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" @click="addPricing">
            <i class="fas fa-plus"></i> Ajouter un tarif
          </button>
        </div>
        <div v-if="validationErrors.pricing" class="invalid-feedback d-block">
          {{ validationErrors.pricing }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="registration">Date limite d'inscription *</label>
        <input 
          id="registration" 
          v-model="form.details.registration" 
          type="text" 
          required 
          placeholder="Ex: 19/03/2025"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.registration }"
        >
        <div v-if="validationErrors.registration" class="invalid-feedback">
          {{ validationErrors.registration }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="contact">Téléphone de contact *</label>
        <input 
          id="contact" 
          v-model="form.details.contact" 
          type="text" 
          required 
          placeholder="Ex: 0690 26 30 33"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.contact }"
        >
        <div v-if="validationErrors.contact" class="invalid-feedback">
          {{ validationErrors.contact }}
        </div>
      </div>
      
      <div class="form-group">
        <label for="email">Email de contact *</label>
        <input 
          id="email" 
          v-model="form.details.email" 
          type="email" 
          required 
          placeholder="Ex: doucine97351@gmail.com"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.email }"
        >
        <div v-if="validationErrors.email" class="invalid-feedback">
          {{ validationErrors.email }}
        </div>
      </div>
      
      <div class="form-group">
        <label>Informations pratiques *</label>
        <div class="array-inputs">
          <div v-for="(info, index) in form.details.practicalInfo" :key="'info-'+index" class="array-input-row">
            <input 
              :id="'info-'+index" 
              v-model="form.details.practicalInfo[index]" 
              type="text" 
              class="form-control"
              placeholder="Ex: Départ en bus à 7h"
            >
            <button type="button" class="btn btn-danger btn-sm" @click="removePracticalInfo(index)">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" @click="addPracticalInfo">
            <i class="fas fa-plus"></i> Ajouter une information
          </button>
        </div>
        <div v-if="validationErrors.practicalInfo" class="invalid-feedback d-block">
          {{ validationErrors.practicalInfo }}
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
        titre: '',
        description: '',
        horaire: '',
        lieu: '',
        date: {
          jour: '',
          mois: '',
          annee: ''
        },
        image: '', // Optionnel
        details: {
          destination: '',
          activities: [''],
          pricing: [''],
          registration: '',
          contact: '',
          email: '',
          practicalInfo: ['']
        }
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
      try {
        // Pour un nouvel événement, initialiser avec des valeurs par défaut
        const now = new Date();
        if (isNaN(now.getTime())) {
          console.error('Date invalide détectée lors de l\'initialisation');
          // Valeurs par défaut en cas d'erreur
          this.form.date.jour = '01';
          this.form.date.mois = 'JAN';
          this.form.date.annee = '2025';
        } else {
          this.form.date.jour = String(now.getDate()).padStart(2, '0');
          
          // Tableau des mois abrégés en majuscules
          const moisAbreges = ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOU', 'SEP', 'OCT', 'NOV', 'DEC'];
          this.form.date.mois = moisAbreges[now.getMonth()];
          
          this.form.date.annee = String(now.getFullYear());
        }
        
        // Initialiser les tableaux avec des valeurs vides
        this.form.details.activities = [''];
        this.form.details.pricing = [''];
        this.form.details.practicalInfo = [''];
        
        // Initialiser les autres champs obligatoires avec des valeurs par défaut
        if (!this.form.details.destination) this.form.details.destination = '';
        if (!this.form.details.registration) this.form.details.registration = '';
        if (!this.form.details.contact) this.form.details.contact = '';
        if (!this.form.details.email) this.form.details.email = '';
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du formulaire:', error);
      }
    }
  },
  methods: {
    // Méthodes pour gérer les tableaux
    addActivity() {
      this.form.details.activities.push('');
    },
    
    removeActivity(index) {
      if (this.form.details.activities.length > 1) {
        this.form.details.activities.splice(index, 1);
      }
    },
    
    addPricing() {
      this.form.details.pricing.push('');
    },
    
    removePricing(index) {
      if (this.form.details.pricing.length > 1) {
        this.form.details.pricing.splice(index, 1);
      }
    },
    
    addPracticalInfo() {
      this.form.details.practicalInfo.push('');
    },
    
    removePracticalInfo(index) {
      if (this.form.details.practicalInfo.length > 1) {
        this.form.details.practicalInfo.splice(index, 1);
      }
    },
    
    async fetchEvent() {
      this.loading = true;
      this.error = null;
      
      try {
        const event = await eventService.getEventById(this.$route.params.id);
        this.originalEvent = event;
        
        // Remplir le formulaire avec les données de l'événement
        this.form = {
          titre: event.titre,
          description: event.description,
          horaire: event.horaire,
          lieu: event.lieu,
          date: event.date,
          image: event.image || '',
          details: {
            destination: event.details.destination,
            activities: [...event.details.activities], // Copie du tableau
            pricing: [...event.details.pricing], // Copie du tableau
            registration: event.details.registration,
            contact: event.details.contact,
            email: event.details.email,
            practicalInfo: [...event.details.practicalInfo] // Copie du tableau
          }
        };
        
        // S'assurer que les tableaux ne sont jamais vides
        if (this.form.details.activities.length === 0) this.form.details.activities = [''];
        if (this.form.details.pricing.length === 0) this.form.details.pricing = [''];
        if (this.form.details.practicalInfo.length === 0) this.form.details.practicalInfo = [''];
        
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
      
      // Validation des champs de base
      if (!this.form.titre.trim()) {
        this.validationErrors.titre = 'Le titre est requis';
        isValid = false;
      }
      
      if (!this.form.description.trim()) {
        this.validationErrors.description = 'La description est requise';
        isValid = false;
      }
      
      if (!this.form.horaire.trim()) {
        this.validationErrors.horaire = 'L\'horaire est requis';
        isValid = false;
      }
      
      if (!this.form.lieu.trim()) {
        this.validationErrors.lieu = 'Le lieu est requis';
        isValid = false;
      }
      
      // Validation de la date
      if (!this.form.date.jour) {
        this.validationErrors.dateJour = 'Le jour est requis';
        isValid = false;
      }
      
      if (!this.form.date.mois) {
        this.validationErrors.dateMois = 'Le mois est requis';
        isValid = false;
      }
      
      if (!this.form.date.annee) {
        this.validationErrors.dateAnnee = 'L\'année est requise';
        isValid = false;
      }
      
      // Validation des détails
      if (!this.form.details.destination.trim()) {
        this.validationErrors.destination = 'La destination est requise';
        isValid = false;
      }
      
      // Vérifier que les activités ne sont pas vides
      if (this.form.details.activities.length === 0 || !this.form.details.activities.some(a => a.trim())) {
        this.validationErrors.activities = 'Au moins une activité est requise';
        isValid = false;
      }
      
      // Vérifier que les tarifs ne sont pas vides
      if (this.form.details.pricing.length === 0 || !this.form.details.pricing.some(p => p.trim())) {
        this.validationErrors.pricing = 'Au moins un tarif est requis';
        isValid = false;
      }
      
      if (!this.form.details.registration.trim()) {
        this.validationErrors.registration = 'La date limite d\'inscription est requise';
        isValid = false;
      }
      
      if (!this.form.details.contact.trim()) {
        this.validationErrors.contact = 'Le téléphone de contact est requis';
        isValid = false;
      }
      
      if (!this.form.details.email.trim()) {
        this.validationErrors.email = 'L\'email de contact est requis';
        isValid = false;
      } else if (!this.validateEmail(this.form.details.email)) {
        this.validationErrors.email = 'Veuillez entrer une adresse email valide';
        isValid = false;
      }
      
      // Vérifier que les informations pratiques ne sont pas vides
      if (this.form.details.practicalInfo.length === 0 || !this.form.details.practicalInfo.some(i => i.trim())) {
        this.validationErrors.practicalInfo = 'Au moins une information pratique est requise';
        isValid = false;
      }
      
      return isValid;
    },
    
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    
    // Filtrer les tableaux pour supprimer les entrées vides
    cleanArrays() {
      this.form.details.activities = this.form.details.activities.filter(item => item.trim() !== '');
      if (this.form.details.activities.length === 0) this.form.details.activities = [''];
      
      this.form.details.pricing = this.form.details.pricing.filter(item => item.trim() !== '');
      if (this.form.details.pricing.length === 0) this.form.details.pricing = [''];
      
      this.form.details.practicalInfo = this.form.details.practicalInfo.filter(item => item.trim() !== '');
      if (this.form.details.practicalInfo.length === 0) this.form.details.practicalInfo = [''];
    },
    
    async saveEvent() {
      // Nettoyer les tableaux avant validation
      this.cleanArrays();
      
      if (!this.validateForm()) {
        return;
      }
      
      this.saving = true;
      
      try {
        // S'assurer que les valeurs de date sont des chaînes de caractères
        const jourStr = typeof this.form.date.jour === 'string' ? this.form.date.jour.trim() : String(this.form.date.jour);
        const moisStr = typeof this.form.date.mois === 'string' ? this.form.date.mois : String(this.form.date.mois);
        const anneeStr = typeof this.form.date.annee === 'string' ? this.form.date.annee.trim() : String(this.form.date.annee);
        
        // Préparer les données de l'événement
        const eventData = {
          titre: this.form.titre ? this.form.titre.trim() : '',
          description: this.form.description ? this.form.description.trim() : '',
          horaire: this.form.horaire ? this.form.horaire.trim() : '',
          lieu: this.form.lieu ? this.form.lieu.trim() : '',
          date: {
            jour: jourStr,
            mois: moisStr,
            annee: anneeStr
          },
          image: this.form.image && this.form.image.trim() ? this.form.image.trim() : undefined,
          details: {
            destination: this.form.details.destination ? this.form.details.destination.trim() : '',
            activities: this.form.details.activities ? this.form.details.activities.filter(a => a && a.trim && a.trim() !== '') : [''],
            pricing: this.form.details.pricing ? this.form.details.pricing.filter(p => p && p.trim && p.trim() !== '') : [''],
            registration: this.form.details.registration ? this.form.details.registration.trim() : '',
            contact: this.form.details.contact ? this.form.details.contact.trim() : '',
            email: this.form.details.email ? this.form.details.email.trim() : '',
            practicalInfo: this.form.details.practicalInfo ? this.form.details.practicalInfo.filter(i => i && i.trim && i.trim() !== '') : ['']
          }
        };
        
        // Vérifier que les tableaux ne sont pas vides
        if (!eventData.details.activities.length) eventData.details.activities = [''];
        if (!eventData.details.pricing.length) eventData.details.pricing = [''];
        if (!eventData.details.practicalInfo.length) eventData.details.practicalInfo = [''];
        
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

h3 {
  margin-top: 30px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
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

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
}

.form-row > .form-group {
  padding-right: 10px;
  padding-left: 10px;
  flex: 1;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
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

.invalid-feedback.d-block {
  display: block;
}

/* Styles pour les entrées de tableau */
.array-inputs {
  margin-top: 10px;
}

.array-input-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.array-input-row .form-control {
  flex: 1;
  margin-right: 10px;
}

.array-input-row .btn {
  padding: 8px;
  min-width: 40px;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 14px;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #d32f2f;
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

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .form-row > .form-group,
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
