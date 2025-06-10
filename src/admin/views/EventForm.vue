<template>
  <div class="admin-event-form max-w-4xl mx-auto">
    <div class="card mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800 m-0">{{ isEditing ? 'Modifier l\'événement' : 'Créer un événement' }}</h1>
        <button @click="goBack" class="btn btn-icon" title="Retour">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      
      <div v-if="loading" class="py-12 flex flex-col items-center justify-center">
        <div class="w-16 h-16 text-primary text-3xl flex items-center justify-center">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p class="mt-4 text-gray-600">Chargement des données...</p>
      </div>
      
      <div v-else-if="error" class="py-12 flex flex-col items-center justify-center">
        <div class="w-16 h-16 text-danger text-3xl flex items-center justify-center">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <p class="mt-4 text-danger">{{ error }}</p>
        <button @click="goBack" class="btn btn-primary mt-6">Retour</button>
      </div>
      
      <div v-else>
        <!-- Onglets -->
        <div class="border-b border-gray-200 mb-6">
          <ul class="flex flex-wrap -mb-px">
            <li v-for="(tab, index) in tabs" :key="index" class="mr-2">
              <button 
                @click="activeTab = tab.id" 
                class="inline-block p-4 text-gray-600 hover:text-primary transition-colors border-b-2 font-medium text-sm"
                :class="[
                  activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent hover:border-gray-300'
                ]"
              >
                <i :class="['mr-2', tab.icon]"></i>
                {{ tab.label }}
              </button>
            </li>
          </ul>
        </div>
        
        <form @submit.prevent="saveEvent">
          <!-- Section Informations de base -->
          <div v-show="activeTab === 'basic'" class="px-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField
                id="titre"
                label="Titre de l'événement"
                v-model="form.titre"
                placeholder="Ex: Sortie Kayak à Sinnamary"
                :required="true"
                :error="validationErrors.titre"
              />
              
              <div class="grid grid-cols-3 gap-4">
                <FormField
                  id="dateJour"
                  label="Jour"
                  v-model="form.date.jour"
                  placeholder="JJ"
                  :required="true"
                  :error="validationErrors.dateJour"
                />
                
                <FormField
                  id="dateMois"
                  label="Mois"
                  v-model="form.date.mois"
                  placeholder="MMM"
                  :required="true"
                  :error="validationErrors.dateMois"
                />
                
                <FormField
                  id="dateAnnee"
                  label="Année"
                  v-model="form.date.annee"
                  placeholder="AAAA"
                  :required="true"
                  :error="validationErrors.dateAnnee"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField
                id="horaire"
                label="Horaire"
                v-model="form.horaire"
                placeholder="Ex: 7h00 - 16h00"
                :required="true"
                :error="validationErrors.horaire"
              />
              
              <FormField
                id="lieu"
                label="Lieu"
                v-model="form.lieu"
                placeholder="Ex: Départ de Family Plaza"
                :required="true"
                :error="validationErrors.lieu"
              />
            </div>
            
            <FormField
              id="description"
              label="Description"
              v-model="form.description"
              type="textarea"
              :rows="4"
              placeholder="Décrivez l'événement en quelques phrases..."
              :required="true"
              :error="validationErrors.description"
            />
            
            <ImageUploadField
              id="image"
              label="Image de l'événement"
              v-model="form.image"
              class="mt-6"
            />
          </div>
          
          <!-- Section Détails de l'événement -->
          <div v-show="activeTab === 'details'" class="px-1">
            <FormField
              id="destination"
              label="Destination"
              v-model="form.details.destination"
              placeholder="Ex: Îlot des Caïmans à Sinnamary"
              :required="true"
              :error="validationErrors.destination"
              class="mb-6"
            />
            
            <ArrayInputField
              id="activities"
              label="Activités proposées"
              v-model="form.details.activities"
              placeholder="Ex: Visite des caïmans"
              addButtonText="Ajouter une activité"
              :error="validationErrors.activities"
              class="mb-6"
            />
            
            <ArrayInputField
              id="pricing"
              label="Tarifs"
              v-model="form.details.pricing"
              placeholder="Ex: 50€ par adulte"
              addButtonText="Ajouter un tarif"
              :error="validationErrors.pricing"
              class="mb-6"
            />
            
            <ArrayInputField
              id="practicalInfo"
              label="Informations pratiques"
              v-model="form.details.practicalInfo"
              placeholder="Ex: Départ en bus à 7h"
              addButtonText="Ajouter une information"
              :error="validationErrors.practicalInfo"
            />
          </div>
          
          <!-- Section Contact -->
          <div v-show="activeTab === 'contact'" class="px-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField
                id="registration"
                label="Date limite d'inscription"
                v-model="form.details.registration"
                placeholder="Ex: 19/03/2025"
                :required="true"
                :error="validationErrors.registration"
              />
              
              <FormField
                id="contact"
                label="Téléphone"
                v-model="form.details.contact"
                placeholder="Ex: 0690 26 30 33"
                :required="true"
                :error="validationErrors.contact"
              />
            </div>
            
            <FormField
              id="email"
              label="Email de contact"
              type="email"
              v-model="form.details.email"
              placeholder="Ex: doucine97351@gmail.com"
              :required="true"
              :error="validationErrors.email"
            />
          </div>
          
          <!-- Prévisualisation -->
          <div v-show="activeTab === 'preview'" class="px-1">
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex flex-col md:flex-row md:items-start gap-6">
                <div class="w-full md:w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    v-if="form.image" 
                    :src="form.image" 
                    alt="Aperçu de l'événement" 
                    class="w-full h-full object-cover"
                    @error="imageError = true"
                  >
                  <div v-else class="text-gray-400 flex flex-col items-center">
                    <i class="fas fa-image text-4xl mb-2"></i>
                    <span class="text-sm">Aucune image</span>
                  </div>
                </div>
                
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">{{ form.titre || 'Titre de l\'événement' }}</h3>
                  
                  <div class="flex flex-wrap gap-4 mb-4">
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="far fa-calendar-alt mr-2 text-primary"></i>
                      <span>{{ formatDate(form.date) || 'Date' }}</span>
                    </div>
                    
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="far fa-clock mr-2 text-primary"></i>
                      <span>{{ form.horaire || 'Horaire' }}</span>
                    </div>
                    
                    <div class="flex items-center text-sm text-gray-600">
                      <i class="fas fa-map-marker-alt mr-2 text-primary"></i>
                      <span>{{ form.lieu || 'Lieu' }}</span>
                    </div>
                  </div>
                  
                  <p class="text-gray-600 mb-4">{{ form.description || 'Description de l\'événement...' }}</p>
                  
                  <div class="text-sm">
                    <div class="font-medium text-gray-700">Date limite d'inscription:</div>
                    <p class="text-gray-600 mb-2">{{ form.details.registration || '-' }}</p>
                    
                    <div class="font-medium text-gray-700">Contact:</div>
                    <p class="text-gray-600">{{ form.details.contact || '-' }} | {{ form.details.email || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Boutons d'action -->
          <div class="mt-8 flex justify-between">
            <div>
              <button 
                v-if="activeTab !== 'basic'" 
                type="button" 
                @click="prevTab" 
                class="btn btn-secondary"
              >
                <i class="fas fa-chevron-left mr-2"></i> Précédent
              </button>
            </div>
            
            <div class="flex gap-3">
              <button type="button" @click="goBack" class="btn btn-secondary">
                <i class="fas fa-times"></i> Annuler
              </button>
              
              <button 
                v-if="activeTab !== 'preview'" 
                type="button" 
                @click="nextTab" 
                class="btn btn-primary"
              >
                Suivant <i class="fas fa-chevron-right ml-2"></i>
              </button>
              
              <button 
                v-else 
                type="submit" 
                class="btn btn-primary" 
                :disabled="saving"
              >
                <i class="fas fa-save mr-2"></i>
                <span v-if="saving">Enregistrement...</span>
                <span v-else>{{ isEditing ? 'Mettre à jour' : 'Créer' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import eventService from '../services/eventService';
import FormField from '../components/forms/FormField.vue';
import ArrayInputField from '../components/forms/ArrayInputField.vue';
import ImageUploadField from '../components/forms/ImageUploadField.vue';

export default {
  name: 'EventForm',
  components: {
    FormField,
    ArrayInputField,
    ImageUploadField
  },
  data() {
    return {
      activeTab: 'basic',
      tabs: [
        { id: 'basic', label: 'Informations', icon: 'fas fa-info-circle' },
        { id: 'details', label: 'Détails', icon: 'fas fa-list-alt' },
        { id: 'contact', label: 'Contact', icon: 'fas fa-phone-alt' },
        { id: 'preview', label: 'Aperçu', icon: 'fas fa-eye' }
      ],
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
        image: '',
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
      validationErrors: {},
      imageError: false
    };
  },
  computed: {
    isEditing() {
      return !!this.$route.params.id;
    },
    currentTabIndex() {
      return this.tabs.findIndex(tab => tab.id === this.activeTab);
    }
  },
  created() {
    if (this.isEditing) {
      this.fetchEvent();
    } else {
      this.initializeForm();
    }
  },
  methods: {
    nextTab() {
      const nextIndex = this.currentTabIndex + 1;
      if (nextIndex < this.tabs.length) {
        this.activeTab = this.tabs[nextIndex].id;
        this.scrollToTop();
      }
    },
    
    prevTab() {
      const prevIndex = this.currentTabIndex - 1;
      if (prevIndex >= 0) {
        this.activeTab = this.tabs[prevIndex].id;
        this.scrollToTop();
      }
    },
    
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    
    formatDate(date) {
      if (!date || !date.jour || !date.mois || !date.annee) return '';
      return `${date.jour} ${date.mois} ${date.annee}`;
    },
    
    initializeForm() {
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
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du formulaire:', error);
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
        this.validationErrors.dateJour = 'Requis';
        isValid = false;
      }
      
      if (!this.form.date.mois) {
        this.validationErrors.dateMois = 'Requis';
        isValid = false;
      }
      
      if (!this.form.date.annee) {
        this.validationErrors.dateAnnee = 'Requis';
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
      
      if (!isValid) {
        // Si validation échoue, redirige vers l'onglet contenant la première erreur
        if (this.validationErrors.titre || this.validationErrors.description || 
            this.validationErrors.horaire || this.validationErrors.lieu || 
            this.validationErrors.dateJour || this.validationErrors.dateMois || 
            this.validationErrors.dateAnnee) {
          this.activeTab = 'basic';
        } else if (this.validationErrors.destination || this.validationErrors.activities || 
                  this.validationErrors.pricing || this.validationErrors.practicalInfo) {
          this.activeTab = 'details';
        } else if (this.validationErrors.registration || this.validationErrors.contact || 
                  this.validationErrors.email) {
          this.activeTab = 'contact';
        }
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
.card {
  @apply bg-white p-6 rounded-xl shadow-sm;
}
</style>

