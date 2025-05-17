<template>
  <div 
    v-if="!consentGiven" 
    class="cookie-consent" 
    role="dialog" 
    aria-labelledby="cookie-title" 
    aria-describedby="cookie-description"
  >
    <div class="cookie-content">
      <h2 id="cookie-title" class="cookie-title">🍪 Gestion des cookies</h2>
      <p id="cookie-description" class="cookie-description">
        Nous utilisons des cookies pour améliorer votre expérience sur notre site. Ces cookies sont nécessaires au fonctionnement du site et à l'analyse de notre audience. Conformément au RGPD, votre consentement est requis avant de stocker des cookies sur votre appareil.
      </p>
      
      <div class="cookie-options">
        <div v-for="(option, index) in cookieOptions" :key="index" class="cookie-option">
          <input 
            type="checkbox" 
            :id="option.id" 
            v-model="option.accepted" 
            :disabled="option.required"
          />
          <label :for="option.id" class="cookie-option-label">
            <strong>{{ option.name }}</strong>
            <span>{{ option.description }}</span>
          </label>
        </div>
      </div>
      
      <div class="cookie-actions">
        <button 
          @click="acceptSelected" 
          class="cookie-btn cookie-btn-primary"
          aria-label="Accepter les cookies sélectionnés"
        >
          Accepter la sélection
        </button>
        <button 
          @click="acceptAll" 
          class="cookie-btn cookie-btn-secondary"
          aria-label="Accepter tous les cookies"
        >
          Tout accepter
        </button>
        <button 
          @click="rejectAll" 
          class="cookie-btn cookie-btn-tertiary"
          aria-label="Rejeter tous les cookies non essentiels"
        >
          Tout rejeter
        </button>
      </div>
      
      <div class="cookie-footer">
        <p>
          Pour plus d'informations, consultez notre 
          <router-link to="/politique-confidentialite" class="cookie-link">politique de confidentialité</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookieConsent",
  data() {
    return {
      consentGiven: false,
      cookieOptions: [
        {
          id: "cookie-essential",
          name: "Cookies essentiels",
          description: "Nécessaires au bon fonctionnement du site",
          accepted: true,
          required: true
        },
        {
          id: "cookie-functional",
          name: "Cookies fonctionnels",
          description: "Permettent de mémoriser vos préférences",
          accepted: false,
          required: false
        },
        {
          id: "cookie-analytics",
          name: "Cookies analytiques",
          description: "Nous aident à comprendre comment vous utilisez le site",
          accepted: false,
          required: false
        },
        {
          id: "cookie-marketing",
          name: "Cookies marketing",
          description: "Utilisés pour vous proposer des publicités pertinentes",
          accepted: false,
          required: false
        }
      ]
    };
  },
  mounted() {
    // Vérifier si l'utilisateur a déjà donné son consentement
    this.checkConsent();
    
    // Exposer la méthode pour ouvrir la bannière de cookies
    window.openCookieConsent = this.openConsent;
  },
  methods: {
    checkConsent() {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        try {
          const consentData = JSON.parse(consent);
          this.consentGiven = true;
          
          // Mise à jour des options avec les choix précédents
          this.cookieOptions.forEach(option => {
            if (consentData[option.id] !== undefined) {
              option.accepted = consentData[option.id];
            }
          });
          
          // Émettre l'événement pour informer l'application des préférences
          this.$emit('consent-updated', this.getConsentObject());
        } catch (e) {
          console.error('Erreur lors de la lecture du consentement :', e);
          this.consentGiven = false;
        }
      } else {
        this.consentGiven = false;
      }
    },
    acceptAll() {
      this.cookieOptions.forEach(option => {
        option.accepted = true;
      });
      this.saveConsent();
    },
    acceptSelected() {
      this.saveConsent();
    },
    rejectAll() {
      this.cookieOptions.forEach(option => {
        if (!option.required) {
          option.accepted = false;
        }
      });
      this.saveConsent();
    },
    saveConsent() {
      const consentObj = this.getConsentObject();
      
      // Sauvegarder dans localStorage
      localStorage.setItem('cookie-consent', JSON.stringify(consentObj));
      
      // Marquer le consentement comme donné
      this.consentGiven = true;
      
      // Émettre l'événement pour informer l'application des préférences
      this.$emit('consent-updated', consentObj);
      
      // Initialiser les cookies autorisés
      this.initializeCookies(consentObj);
    },
    getConsentObject() {
      const consentObj = {
        timestamp: new Date().toISOString()
      };
      
      this.cookieOptions.forEach(option => {
        consentObj[option.id] = option.accepted;
      });
      
      return consentObj;
    },
    initializeCookies(consentObj) {
      // Initialiser les cookies selon les préférences
      // Exemple: analytics
      if (consentObj['cookie-analytics']) {
        // Initialiser analytics
        console.log('Analytics cookies activated');
      }
      
      // Marketing
      if (consentObj['cookie-marketing']) {
        // Initialiser marketing
        console.log('Marketing cookies activated');
      }
    },
    openConsent() {
      this.consentGiven = false;
    }
  }
};
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  padding: 24px;
  z-index: 9999;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;
}

.cookie-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px;
  color: #2a3040;
}

.cookie-description {
  font-size: 14px;
  line-height: 1.6;
  color: #4d5259;
  margin-bottom: 20px;
}

.cookie-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.cookie-option {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.cookie-option input[type="checkbox"] {
  margin-top: 4px;
}

.cookie-option-label {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.cookie-option-label strong {
  color: #2a3040;
  margin-bottom: 2px;
}

.cookie-option-label span {
  color: #4d5259;
  font-size: 13px;
}

.cookie-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.cookie-btn {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.cookie-btn:focus {
  outline: none;
}

.cookie-btn-primary {
  background-color: #bc0926;
  color: white;
  border: none;
}

.cookie-btn-primary:hover {
  background-color: #a00820;
}

.cookie-btn-secondary {
  background-color: transparent;
  color: #bc0926;
  border: 1px solid #bc0926;
}

.cookie-btn-secondary:hover {
  background-color: rgba(188, 9, 38, 0.05);
}

.cookie-btn-tertiary {
  background-color: transparent;
  color: #4d5259;
  border: 1px solid #e0e0e0;
}

.cookie-btn-tertiary:hover {
  background-color: #f5f5f5;
}

.cookie-footer {
  font-size: 13px;
  color: #4d5259;
  text-align: center;
}

.cookie-link {
  color: #bc0926;
  text-decoration: none;
}

.cookie-link:hover {
  text-decoration: underline;
}

.cookie-link:focus {
  outline: none;
}

@media (max-width: 600px) {
  .cookie-consent {
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    border-radius: 16px 16px 0 0;
  }
  
  .cookie-actions {
    flex-direction: column;
  }
  
  .cookie-btn {
    width: 100%;
  }
}
</style> 