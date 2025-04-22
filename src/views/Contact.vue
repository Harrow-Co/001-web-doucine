<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Contactez-nous</h1>
        <p>Nous sommes à votre écoute pour toute question ou demande d'information</p>
      </div>
    </section>

    <div class="container main-content">
      <div class="contact-grid">
        <!-- Contact Information -->
        <section class="contact-info">
          <h2>Nos coordonnées</h2>
          
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h3>Adresse</h3>
              <p>23 Rue Albert Einstein, 97310 Kourou</p>
            </div>
          </div>
          
          <div class="info-item">
            <i class="fas fa-phone-alt"></i>
            <div>
              <h3>Téléphone</h3>
              <p>0694 20 52 31</p>
            </div>
          </div>
          
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>doucine97351@gmail.com</p>
            </div>
          </div>
          
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <div>
              <h3>Horaires d'ouverture</h3>
              <p>Lundi au Vendredi: 9h00 - 17h00</p>
              <p>Samedi: 10h00 - 14h00</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>
        </section>
        
        <!-- Contact Form -->
        <section class="contact-form">
          <h2>Envoyez-nous un message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                required
                :class="{ 'error': validationErrors.name }"
              >
              <span v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required
                :class="{ 'error': validationErrors.email }"
              >
              <span v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="subject">Sujet</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                required
                :class="{ 'error': validationErrors.subject }"
              >
              <span v-if="validationErrors.subject" class="error-message">{{ validationErrors.subject }}</span>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="5" 
                required
                :class="{ 'error': validationErrors.message }"
              ></textarea>
              <span v-if="validationErrors.message" class="error-message">{{ validationErrors.message }}</span>
            </div>
            
            <div class="form-group submit-group">
              <button type="submit" :disabled="isSubmitting" class="btn-submit">
                <span v-if="isSubmitting">Envoi en cours...</span>
                <span v-else>Envoyer</span>
              </button>
            </div>
            
            <div v-if="formResponse" :class="['form-response', formResponse.type]">
              {{ formResponse.message }}
            </div>
          </form>
        </section>
      </div>
      
      <!-- Map Section -->
      <section class="map-section">
        <h2>Nous trouver</h2>
        <div class="map-container">
          <img src="@/assets/images/placeholder-map.jpg" alt="Carte de localisation" class="placeholder-map">
          <!-- Intégration future d'une carte interactive -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { contactService } from '@/services/api';

export default {
  name: 'ContactPage',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      validationErrors: {},
      isSubmitting: false,
      formResponse: null
    };
  },
  methods: {
    validateForm() {
      this.validationErrors = {};
      let isValid = true;
      
      if (!this.formData.name.trim()) {
        this.validationErrors.name = 'Veuillez entrer votre nom';
        isValid = false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.validationErrors.email = 'Veuillez entrer une adresse email valide';
        isValid = false;
      }
      
      if (!this.formData.subject.trim()) {
        this.validationErrors.subject = 'Veuillez entrer un sujet';
        isValid = false;
      }
      
      if (!this.formData.message.trim()) {
        this.validationErrors.message = 'Veuillez entrer votre message';
        isValid = false;
      } else if (this.formData.message.length < 10) {
        this.validationErrors.message = 'Votre message doit contenir au moins 10 caractères';
        isValid = false;
      }
      
      return isValid;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      this.formResponse = null;
      
      try {
        await contactService.submitContactForm(this.formData);
        
        this.formResponse = {
          type: 'success',
          message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        };
        
        // Réinitialiser le formulaire
        this.formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      } catch (error) {
        this.formResponse = {
          type: 'error',
          message: error.message || 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
        };
        console.error('Erreur lors de la soumission du formulaire:', error);
      } finally {
        this.isSubmitting = false;
        
        // Scroll to the response message
        this.$nextTick(() => {
          const responseEl = document.querySelector('.form-response');
          if (responseEl) {
            responseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('@/assets/images/placeholder-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  padding: 60px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #293241;
  position: relative;
  padding-bottom: 10px;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #ee6c4d;
}

/* Contact Info Styles */
.contact-info {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
}

.info-item i {
  font-size: 1.5rem;
  color: #ee6c4d;
  margin-right: 15px;
  margin-top: 5px;
}

.info-item h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #293241;
}

.info-item p {
  margin: 0 0 5px 0;
  color: #555;
}

/* Contact Form Styles */
.contact-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #293241;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  border-color: #3d5a80;
  outline: none;
}

input.error, textarea.error {
  border-color: #e63946;
}

.error-message {
  color: #e63946;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
}

.btn-submit {
  background-color: #ee6c4d;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #e0583d;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-response {
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
}

.form-response.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-response.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Map Section */
.map-section {
  margin-top: 60px;
}

.map-container {
  height: 400px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.placeholder-map {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 576px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .hero-section h1 {
    font-size: 2.2rem;
  }
  
  .main-content {
    padding: 40px 0;
  }
  
  .contact-info, .contact-form {
    padding: 20px;
  }
  
  .map-container {
    height: 300px;
  }
}
</style> 