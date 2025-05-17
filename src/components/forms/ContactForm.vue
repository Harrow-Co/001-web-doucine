<template>
  <div class="contact-form-container">
    <h2 class="form-title">Contactez-nous</h2>
    <p class="form-subtitle">Nous sommes à votre écoute et répondrons à votre message dans les plus brefs délais.</p>
    
    <form @submit.prevent="submitForm" class="contact-form">
      <div class="form-group">
        <label for="name" class="form-label">Nom complet <span class="required">*</span></label>
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          class="form-input" 
          :class="{'error': validationErrors.name}" 
          required 
          aria-required="true"
        />
        <p v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</p>
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">Email <span class="required">*</span></label>
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          class="form-input" 
          :class="{'error': validationErrors.email}" 
          required 
          aria-required="true"
        />
        <p v-if="validationErrors.email" class="error-message">{{ validationErrors.email }}</p>
      </div>
      
      <div class="form-group">
        <label for="phone" class="form-label">Téléphone</label>
        <input 
          type="tel" 
          id="phone" 
          v-model="formData.phone" 
          class="form-input"
          placeholder="0694XXXXXX" 
        />
      </div>
      
      <div class="form-group">
        <label for="subject" class="form-label">Sujet <span class="required">*</span></label>
        <select 
          id="subject" 
          v-model="formData.subject" 
          class="form-input form-select" 
          :class="{'error': validationErrors.subject}" 
          required 
          aria-required="true"
        >
          <option value="" disabled selected>Sélectionnez un sujet</option>
          <option value="information">Demande d'information</option>
          <option value="inscription">Inscription à un événement</option>
          <option value="adhesion">Adhésion à l'association</option>
          <option value="benevolat">Devenir bénévole</option>
          <option value="autre">Autre</option>
        </select>
        <p v-if="validationErrors.subject" class="error-message">{{ validationErrors.subject }}</p>
      </div>
      
      <div class="form-group full-width">
        <label for="message" class="form-label">Message <span class="required">*</span></label>
        <textarea 
          id="message" 
          v-model="formData.message" 
          class="form-input form-textarea" 
          :class="{'error': validationErrors.message}" 
          rows="5" 
          required 
          aria-required="true"
        ></textarea>
        <p v-if="validationErrors.message" class="error-message">{{ validationErrors.message }}</p>
      </div>
      
      <div class="form-group full-width checkbox-group">
        <div class="checkbox-container">
          <input 
            type="checkbox" 
            id="privacy" 
            v-model="formData.privacyAccepted" 
            required 
            aria-required="true"
          />
          <label for="privacy" class="checkbox-label">
            J'accepte que mes données soient utilisées pour me recontacter. 
            <router-link to="/politique-confidentialite" class="privacy-link">Politique de confidentialité</router-link>
            <span class="required">*</span>
          </label>
        </div>
        <p v-if="validationErrors.privacyAccepted" class="error-message">{{ validationErrors.privacyAccepted }}</p>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-button" :disabled="isSubmitting">
          <span v-if="isSubmitting">Envoi en cours...</span>
          <span v-else>Envoyer</span>
        </button>
      </div>
      
      <div v-if="formSubmitted" class="success-message">
        <i class="fas fa-check-circle success-icon"></i>
        <p>Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</p>
      </div>
      
      <div v-if="formError" class="form-error-message">
        <i class="fas fa-exclamation-circle error-icon"></i>
        <p>{{ formError }}</p>
        <p>Veuillez réessayer ou nous contacter directement à doucine97351@gmail.com</p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        privacyAccepted: false
      },
      validationErrors: {},
      isSubmitting: false,
      formSubmitted: false,
      formError: null
    };
  },
  methods: {
    validateForm() {
      this.validationErrors = {};
      let isValid = true;
      
      if (!this.formData.name.trim()) {
        this.validationErrors.name = "Veuillez entrer votre nom";
        isValid = false;
      }
      
      if (!this.formData.email.trim()) {
        this.validationErrors.email = "Veuillez entrer votre email";
        isValid = false;
      } else if (!this.isValidEmail(this.formData.email)) {
        this.validationErrors.email = "Veuillez entrer un email valide";
        isValid = false;
      }
      
      if (!this.formData.subject) {
        this.validationErrors.subject = "Veuillez sélectionner un sujet";
        isValid = false;
      }
      
      if (!this.formData.message.trim()) {
        this.validationErrors.message = "Veuillez entrer votre message";
        isValid = false;
      }
      
      if (!this.formData.privacyAccepted) {
        this.validationErrors.privacyAccepted = "Vous devez accepter la politique de confidentialité";
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
        // Scroll to the first error
        this.$nextTick(() => {
          const firstError = document.querySelector('.error-message');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        return;
      }
      
      this.isSubmitting = true;
      this.formError = null;
      
      try {
        // En production, remplacer par un vrai appel API
        // Exemple: const response = await axios.post('/api/contact', this.formData);
        
        // Simulation d'un appel API pour le moment
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Form data submitted:', this.formData);
        
        // Réinitialiser le formulaire
        this.formData = {
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          privacyAccepted: false
        };
        
        this.formSubmitted = true;
        
        // Scroll to success message
        this.$nextTick(() => {
          const successMessage = document.querySelector('.success-message');
          if (successMessage) {
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        
        // Réinitialiser après 5 secondes
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
        
      } catch (error) {
        console.error('Error submitting form:', error);
        this.formError = "Une erreur est survenue lors de l'envoi du formulaire.";
        
        // Scroll to error message
        this.$nextTick(() => {
          const errorMessage = document.querySelector('.form-error-message');
          if (errorMessage) {
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.contact-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 2rem;
  color: #bc0926;
  margin-bottom: 0.5rem;
  text-align: center;
}

.form-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  width: 100%;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  font-family: inherit;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #5DC8E6;
  box-shadow: 0 0 0 3px rgba(93, 200, 230, 0.1);
}

.form-input.error {
  border-color: #bc0926;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #555;
}

.required {
  color: #bc0926;
}

.error-message {
  color: #bc0926;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.submit-button {
  background-color: #bc0926;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
}

.submit-button:hover:not(:disabled) {
  background-color: #a30820;
  transform: translateY(-2px);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.success-message, 
.form-error-message {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
}

.success-message {
  background-color: #e8f6f0;
  color: #2d8a63;
  border: 1px solid #c3e6d7;
}

.form-error-message {
  background-color: #fef2f2;
  color: #bc0926;
  border: 1px solid #fbd5d5;
}

.success-icon, 
.error-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.privacy-link {
  color: #5DC8E6;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .contact-form {
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.5rem;
  }
  
  .form-group {
    width: calc(50% - 0.75rem);
  }
  
  .full-width {
    width: 100%;
  }
}
</style> 