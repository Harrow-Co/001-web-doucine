<template>
  <div class="contact-page">
    <!-- Hero section -->
    <section class="hero-section">
      <div class="container">
        <h1>Contactez-nous</h1>
        <p>Nous sommes à votre écoute pour répondre à toutes vos questions</p>
      </div>
    </section>

    <div class="container main-content">
      <div class="contact-grid">
        <!-- Contact information -->
        <div class="contact-info">
          <h2>Nos coordonnées</h2>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h3>Adresse</h3>
              <p>123 Avenue des Soins, 75000 Paris</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-phone-alt"></i>
            <div>
              <h3>Téléphone</h3>
              <p>06 94 20 52 31</p>
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
              <p>Lundi au Vendredi: 9h - 18h</p>
              <p>Samedi: 10h - 15h</p>
            </div>
          </div>
        </div>
        
        <!-- Contact form -->
        <div class="contact-form">
          <h2>Envoyez-nous un message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                required
                :class="{ 'error': errors.name }"
              >
              <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required
                :class="{ 'error': errors.email }"
              >
              <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="subject">Sujet</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                required
                :class="{ 'error': errors.subject }"
              >
              <span class="error-message" v-if="errors.subject">{{ errors.subject }}</span>
            </div>
            
            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="5" 
                required
                :class="{ 'error': errors.message }"
              ></textarea>
              <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
            </div>
            
            <div class="form-group">
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                <span v-if="isSubmitting">
                  <i class="fas fa-spinner fa-spin"></i> Envoi en cours...
                </span>
                <span v-else>
                  <i class="fas fa-paper-plane"></i> Envoyer
                </span>
              </button>
            </div>
            
            <div class="form-message" v-if="formMessage">
              <div :class="['message', formMessage.type]">
                <i :class="formMessage.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                {{ formMessage.text }}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Map section -->
      <div class="map-section">
        <h2>Nous trouver</h2>
        <div class="map-container">
          <!-- Placeholder for map - integrate Google Maps or OpenStreetMap as needed -->
          <div class="map-placeholder">
            <img src="@/assets/images/placeholder-map.jpg" alt="Carte" class="map-img">
            <div class="map-overlay">
              <p>Carte interactive à venir</p>
              <button class="directions-btn">
                <i class="fas fa-directions"></i> Itinéraire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactView',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      isSubmitting: false,
      formMessage: null
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      if (!this.formData.name.trim()) {
        this.errors.name = 'Veuillez entrer votre nom';
        isValid = false;
      }
      
      if (!this.formData.email.trim()) {
        this.errors.email = 'Veuillez entrer votre email';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.errors.email = 'Veuillez entrer un email valide';
        isValid = false;
      }
      
      if (!this.formData.subject.trim()) {
        this.errors.subject = 'Veuillez entrer un sujet';
        isValid = false;
      }
      
      if (!this.formData.message.trim()) {
        this.errors.message = 'Veuillez entrer votre message';
        isValid = false;
      }
      
      return isValid;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      this.formMessage = null;
      
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/contact-messages`, 
          { data: this.formData }
        );
        
        if (response.data) {
          this.formMessage = {
            type: 'success',
            text: 'Votre message a été envoyé avec succès. Nous vous contacterons dans les plus brefs délais.'
          };
          
          // Reset form
          this.formData = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        
        if (error.response && error.response.data && error.response.data.error) {
          this.formMessage = {
            type: 'error',
            text: error.response.data.error.message || 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
          };
        } else {
          this.formMessage = {
            type: 'error',
            text: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.'
          };
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.contact-page {
  color: #333;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('@/assets/images/placeholder-bg.jpg') center/cover no-repeat;
  color: white;
  padding: 100px 0;
  text-align: center;
  margin-top: 72px; /* To account for the fixed navbar */
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-section p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
  
  .hero-section {
    padding: 60px 0;
  }
  
  .hero-section h1 {
    font-size: 2.5rem;
  }
}

.contact-info {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-info:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}

.contact-info h2 {
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: #EB1A3A;
  position: relative;
  padding-bottom: 10px;
}

.contact-info h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
}

.info-item {
  display: flex;
  margin-bottom: 25px;
  align-items: flex-start;
}

.info-item i {
  font-size: 22px;
  color: #FBB018;
  margin-right: 15px;
  margin-top: 5px;
  width: 24px;
  text-align: center;
}

.info-item h3 {
  margin: 0 0 5px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2A3040;
}

.info-item p {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.contact-form {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.contact-form h2 {
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: #EB1A3A;
  position: relative;
  padding-bottom: 10px;
}

.contact-form h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2A3040;
}

input, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

input:focus, textarea:focus {
  border-color: #FBB018;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(251, 176, 24, 0.2);
  outline: none;
}

input.error, textarea.error {
  border-color: #EB1A3A;
  background-color: rgba(235, 26, 58, 0.03);
}

.error-message {
  color: #EB1A3A;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: auto;
  min-width: 160px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(235, 26, 58, 0.2);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  background: #b5b5b5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.form-message {
  margin-top: 20px;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.message.success {
  background-color: rgba(79, 138, 16, 0.1);
  color: #4f8a10;
  border-left: 4px solid #4f8a10;
}

.message.error {
  background-color: rgba(216, 0, 12, 0.1);
  color: #d8000c;
  border-left: 4px solid #d8000c;
}

.message i {
  font-size: 18px;
}

.map-section {
  margin-top: 60px;
}

.map-section h2 {
  margin-bottom: 30px;
  font-size: 1.8rem;
  color: #EB1A3A;
  position: relative;
  padding-bottom: 10px;
}

.map-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.map-placeholder {
  position: relative;
  height: 400px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.map-placeholder:hover .map-overlay {
  background-color: rgba(0, 0, 0, 0.4);
}

.map-overlay p {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  margin-bottom: 15px;
}

.directions-btn {
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.directions-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

@media (max-width: 576px) {
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .hero-section p {
    font-size: 1rem;
  }
  
  .contact-info,
  .contact-form {
    padding: 20px;
  }
  
  .map-placeholder {
    height: 300px;
  }
}
</style> 