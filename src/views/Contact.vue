<template>
  <div class="contact-page">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Contactez-nous</h1>
        <p class="hero-subtitle">Nous sommes à votre écoute pour toute question ou demande d'information</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-info">
            <h2>Nos coordonnées</h2>
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h3>Adresse</h3>
                <p>Association Doucine<br />17 rue du vieux puits<br />97351 Matoury</p>
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
                <p>Du lundi au vendredi<br />9h00 - 17h00</p>
              </div>
            </div>
            <div class="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div class="contact-form">
            <h2>Envoyez-nous un message</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" v-model="form.name" required />
                <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" required />
                <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
              </div>
              <div class="form-group">
                <label for="subject">Sujet</label>
                <input type="text" id="subject" v-model="form.subject" required />
                <p v-if="errors.subject" class="error-message">{{ errors.subject }}</p>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
                <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
              </div>
              <button 
                type="submit" 
                class="btn-submit" 
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
              </button>
              <div v-if="submitSuccess" class="success-message">
                <i class="fas fa-check-circle"></i>
                <p>Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</p>
              </div>
              <div v-if="submitError" class="error-alert">
                <i class="fas fa-exclamation-circle"></i>
                <p>{{ submitError }}</p>
                <p>Vous pouvez également nous contacter directement par email à doucine97351@gmail.com</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="map-section">
      <div class="container">
        <h2>Nous trouver</h2>
        <div class="map-container">
          <!-- Placeholder for map -->
          <div class="map-placeholder">
            <p>Carte interactive sera disponible prochainement</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { contactService } from '@/services/api';

export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
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
      submitSuccess: false,
      submitError: ''
    }
  },
  methods: {
    validateForm() {
      // Réinitialiser les erreurs
      this.errors = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      
      let isValid = true;
      
      // Validation du nom
      if (!this.form.name.trim()) {
        this.errors.name = 'Veuillez saisir votre nom';
        isValid = false;
      }
      
      // Validation de l'email
      if (!this.form.email.trim()) {
        this.errors.email = 'Veuillez saisir votre email';
        isValid = false;
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Veuillez saisir un email valide';
        isValid = false;
      }
      
      // Validation du sujet
      if (!this.form.subject.trim()) {
        this.errors.subject = 'Veuillez saisir un sujet';
        isValid = false;
      }
      
      // Validation du message
      if (!this.form.message.trim()) {
        this.errors.message = 'Veuillez saisir votre message';
        isValid = false;
      }
      
      return isValid;
    },
    
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }
      
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = '';
      
      try {
        await contactService.submitContactForm(this.form);
        
        // Réinitialiser le formulaire
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        
        this.submitSuccess = true;
        
        // Masquer le message de succès après 5 secondes
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
        
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        this.submitError = error.message || 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style scoped>
.contact-page {
  padding-top: 72px;
}

.hero {
  background: linear-gradient(rgba(5, 25, 55, 0.7), rgba(5, 25, 55, 0.7)), url('@/assets/images/placeholder-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 80px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

.contact-section {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.contact-info {
  flex: 1;
  min-width: 300px;
}

.contact-form {
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.contact-info h2, .contact-form h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #051937;
}

.info-item {
  display: flex;
  margin-bottom: 25px;
  align-items: flex-start;
}

.info-item i {
  font-size: 20px;
  color: #00a2ff;
  margin-right: 15px;
  margin-top: 5px;
}

.info-item h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #051937;
}

.info-item p {
  color: #666;
  line-height: 1.5;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.social-links a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #051937;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: #00a2ff;
  transform: translateY(-3px);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #051937;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #00a2ff;
  outline: none;
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 5px;
}

.btn-submit {
  background: #051937;
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn-submit:hover:not(:disabled) {
  background: #00a2ff;
  transform: translateY(-2px);
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.success-message, 
.error-alert {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-alert {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-message i, 
.error-alert i {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.map-section {
  padding: 60px 0;
}

.map-section h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #051937;
  font-size: 1.8rem;
}

.map-container {
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

.map-placeholder {
  height: 100%;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c757d;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .contact-section {
    padding: 50px 0;
  }
}
</style> 