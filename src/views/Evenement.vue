<template>
  <div class="evenement">
    <!-- Hero Section -->
    <section class="events-hero">
      <div class="events-hero-content">
        <h1 class="events-hero-title animate-fade-in">Nos Événements</h1>
        <p class="events-hero-description animate-slide-up delay-1">
          Rejoignez-nous pour des moments de partage intergénérationnels et créez des souvenirs inoubliables avec DOUCINE.
        </p>
        <div class="events-hero-actions animate-fade-in delay-2">
          <button class="btn btn-primary" @click="navigateTo('#evenement')">Voir les événements</button>
          <button class="btn btn-secondary">Contactez-nous</button>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="events-section section animate-section" id="evenement">
      <div class="events-header ">
        <h2 class="events-title animate-fade-in">Nos prochains événements</h2>
        <p class="events-description animate-slide-up delay-1">
          Découvrez nos événements à venir et rejoignez notre communauté pour des moments de partage et de convivialité.
        </p>
      </div>

      <div class="events-grid">
        <!-- Indicateur de chargement -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Chargement des événements...</p>
        </div>
        
        <!-- Message d'erreur -->
        <div v-else-if="error" class="error-container">
          <p class="error-message">{{ error }}</p>
          <button class="btn btn-primary" @click="fetchEvents">Réessayer</button>
        </div>
        
        <!-- Aucun événement trouvé -->
        <div v-else-if="events.length === 0" class="no-events-container">
          <p class="no-events-message">Aucun événement à venir pour le moment.</p>
          <p>Revenez bientôt pour découvrir nos prochains événements !</p>
        </div>
        
        <!-- Liste des événements -->
        <template v-else>
          <div v-for="(event, index) in events" :key="event.id" 
               class="event-card animate-card"
               :style="{'--delay': `${0.1 + index * 0.1}s`}"
               @click="openModal(event)">
            <div class="event-image-container">
              <img :src="event.image" :alt="event.titre" class="event-image" />
              <div class="event-date animate-pulse">
                <span class="day">{{ event.date.jour }}</span>
                <span class="month">{{ event.date.mois }}</span>
              </div>
            </div>
            <div class="event-content">
              <h3 class="event-title">{{ event.titre }}</h3>
              <p class="event-description">{{ event.description }}</p>
              
              <div class="event-details-container">
                <div class="event-details">
                  <div class="detail">
                    <i class="fas fa-clock"></i>
                    <span>{{ event.horaire }}</span>
                  </div>
                  <div class="detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>{{ event.lieu }}</span>
                  </div>
                </div>
              </div>
              
              <button class="btn btn-primary event-btn">Voir les détails</button>
            </div>
          </div>
        </template>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="events-cta section animate-section">
      <div class="cta-content">
        <h2 class="cta-title animate-fade-in">Vous souhaitez proposer un événement ?</h2>
        <p class="cta-description animate-slide-up delay-1">
          Nous sommes toujours à la recherche de nouvelles idées et collaborations pour enrichir notre communauté.
        </p>
        <button class="btn btn-primary cta-btn animate-pulse delay-2">Proposer un événement</button>
      </div>
    </section>

    <!-- Event Modal -->
    <div class="modal-overlay" v-if="showModal" @click="closeModal">
      <div class="modal-container animate-zoom" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        
        <div class="modal-content" v-if="selectedEvent">
          <div class="modal-columns">
            <div class="modal-flyer">
              <img :src="selectedEvent.image" :alt="selectedEvent.titre" class="flyer-image" />
            </div>
            
            <div class="modal-details">
              <h2 class="modal-title animate-fade-in">{{ selectedEvent.titre }}</h2>
              
              <div class="modal-info-section animate-slide-right delay-1">
                <h3 class="section-title">
                  <i class="fas fa-calendar-alt section-icon"></i>
                  Date et horaires
                </h3>
                <p class="date-info">{{ getFormattedDate(selectedEvent) }}</p>
                <p>{{ selectedEvent.horaire }}</p>
              </div>
              
              <div class="modal-info-section animate-slide-right delay-2">
                <h3 class="section-title">
                  <i class="fas fa-map-marker-alt section-icon"></i>
                  Lieu
                </h3>
                <p>{{ selectedEvent.lieu }}</p>
                <p v-if="selectedEvent.details.destination">Destination : {{ selectedEvent.details.destination }}</p>
              </div>
              
              <div class="modal-info-section animate-slide-right delay-3" v-if="selectedEvent.details.activities">
                <h3 class="section-title">
                  <i class="fas fa-tasks section-icon"></i>
                  Activités
                </h3>
                <ul class="modal-list">
                  <li v-for="(activity, index) in selectedEvent.details.activities" :key="index">
                    {{ activity }}
                  </li>
                </ul>
              </div>
              
              <div class="modal-info-section animate-slide-right delay-4">
                <h3 class="section-title">
                  <i class="fas fa-tag section-icon"></i>
                  Tarifs
                </h3>
                <ul class="modal-list">
                  <li v-for="(price, index) in selectedEvent.details.pricing" :key="index">
                    {{ price }}
                  </li>
                </ul>
              </div>
              
              <div class="modal-info-section animate-slide-right delay-5">
                <h3 class="section-title">
                  <i class="fas fa-info-circle section-icon"></i>
                  Informations pratiques
                </h3>
                <ul class="modal-list pratical-info">
                  <li>Inscription obligatoire</li>
                  <li>Places limitées</li>
                  <li v-if="selectedEvent.details.registration">
                    Date limite d'inscription : {{ selectedEvent.details.registration }}
                  </li>
                </ul>
              </div>
              
              <div class="modal-info-section animate-slide-right delay-6">
                <h3 class="section-title">
                  <i class="fas fa-phone-alt section-icon"></i>
                  Contact
                </h3>
                <p>{{ selectedEvent.details.contact }}</p>
                <p>{{ selectedEvent.details.email }}</p>
              </div>
              
              <div class="modal-actions animate-fade-in delay-7">
                <button class="btn btn-primary modal-btn animate-pulse">S'inscrire maintenant</button>
                <button class="btn btn-secondary modal-btn" @click="closeModal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";
import { eventService } from "@/services/api";
import * as dateFormatter from "@/utils/dateFormatter";

export default {
  name: 'PageEvenement',
  components: {
    TheFooter
  },
  data() {
    return {
      showModal: false,
      selectedEvent: null,
      events: [],
      loading: true,
      error: null
    }
  },
  watch: {
    events: {
      handler(newEvents) {
        console.log("Events array updated:", newEvents);
        console.log("Number of events:", newEvents.length);
      },
      deep: true
    }
  },
  methods: {
    navigateTo(elementId) {
      const element = document.querySelector(elementId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    openModal(event) {
      this.selectedEvent = event;
      this.showModal = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = ''; // Re-enable scrolling
    },
    getFormattedDate(event) {
      // Formater la date depuis le format ISO
      if (event.attributes && event.attributes.date) {
        return dateFormatter.formatEventDate(event.attributes.date);
      } else if (event.date) {
        // Support du format de date personnalisé
        const fullDate = `${event.date.annee}-${this.getMonthNumber(event.date.mois)}-${event.date.jour}`;
        return dateFormatter.formatEventDate(fullDate);
      }
      
      return '';
    },
    
    // Convertir l'abréviation du mois en numéro
    getMonthNumber(abbr) {
      const monthMap = {
        'JAN': '01', 'FEV': '02', 'MAR': '03', 'AVR': '04', 'MAI': '05', 'JUN': '06', 
        'JUL': '07', 'AOU': '08', 'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
      };
      return monthMap[abbr] || '01';
    },
    
    // Méthodes pour récupérer les données depuis l'API
    async fetchEvents() {
      try {
        this.loading = true;
        console.log("Fetching events from API...");
        
        // Récupérer les événements depuis l'API Strapi
        const response = await eventService.getUpcomingEvents();
        console.log("API Response:", response);
        
        if (response && response.data && response.data.data) {
          const formattedEvents = this.formatEvents(response.data.data);
          console.log("Formatted events:", formattedEvents);
          this.events = formattedEvents;
          this.error = null;
        } else {
          console.error("No events found in API response");
          this.error = "Aucun événement trouvé";
          this.events = [];
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        this.error = "Impossible de charger les événements";
        this.events = [];
      } finally {
        this.loading = false;
      }
    },
    
    // Formater les données reçues de l'API pour correspondre à notre structure
    formatEvents(apiEvents) {
      if (!apiEvents || !Array.isArray(apiEvents)) {
        console.error("Invalid events data:", apiEvents);
        return [];
      }
      
      return apiEvents.map(event => {
        try {
          console.log("Processing event:", event);
          
          const { id, attributes } = event;
          
          if (!attributes) {
            console.error("Event missing attributes:", event);
            return null;
          }
          
          if (!attributes.date) {
            console.error("Event missing date:", attributes);
            return null;
          }
          
          const eventDate = new Date(attributes.date);
          
          // Create default details if none are provided
          const defaultDetails = {
            destination: '',
            activities: [],
            pricing: ['Prix non spécifié'],
            registration: '',
            contact: attributes.contact || '0694 20 52 31',
            email: attributes.email || 'doucine97351@gmail.com',
            practicalInfo: ['Information non disponible']
          };
          
          const formattedEvent = {
            id,
            titre: attributes.title || "Sans titre",
            description: attributes.description || "Aucune description",
            horaire: attributes.time || "Horaire non spécifié",
            lieu: attributes.location || "Lieu non spécifié",
            // Extraire la date pour l'affichage dans la carte
            date: {
              jour: eventDate.getDate().toString(),
              mois: dateFormatter.getMonthAbbreviation(eventDate.getMonth()),
              annee: eventDate.getFullYear().toString()
            },
            // Construire l'URL de l'image
            image: attributes.image && attributes.image.data 
              ? `${process.env.VUE_APP_API_URL || 'http://localhost:1337'}${attributes.image.data.attributes.url}`
              : require('@/assets/images/PHOTO-2025-03-13-20-39-40.jpg'),
            // Transformer les détails ou utiliser les valeurs par défaut
            details: attributes.details ? this.formatEventDetails(attributes.details) : defaultDetails
          };
          
          return formattedEvent;
        } catch (err) {
          console.error("Error formatting event:", err, event);
          return null;
        }
      }).filter(event => event !== null); // Filter out any null events
    },
    
    // Formater les détails de l'événement
    formatEventDetails(details) {
      if (!details) return {
        destination: '',
        activities: [],
        pricing: ['Prix non spécifié'],
        registration: '',
        contact: 'Contact non spécifié',
        email: 'Email non spécifié',
        practicalInfo: ['Information non disponible']
      };
      
      try {
        // Formatter les activités
        const activities = details.activities && Array.isArray(details.activities)
          ? details.activities.map(activity => activity.name || activity.toString())
          : [];
        
        // Formatter les tarifs
        const pricing = details.pricing && Array.isArray(details.pricing)
          ? details.pricing.map(price => {
              if (typeof price === 'string') return price;
              
              let priceText = '';
              if (price.amount) priceText = `${price.amount} € `;
              if (price.category) priceText = `${priceText}/ ${price.category}`;
              if (price.includes) priceText = `${priceText} (${price.includes})`;
              return priceText || 'Prix non spécifié';
            })
          : ['Prix non spécifié'];
        
        // Informations pratiques
        const practicalInfo = details.practicalInfo && Array.isArray(details.practicalInfo)
          ? details.practicalInfo.map(info => info.info || info.toString())
          : ['Information non disponible'];
        
        return {
          destination: details.destination || '',
          activities,
          pricing,
          // Formater la date d'inscription si disponible
          registration: details.registration 
            ? new Date(details.registration).toLocaleDateString('fr-FR')
            : '',
          contact: details.contact || 'Contact non spécifié',
          email: details.email || 'Email non spécifié',
          practicalInfo
        };
      } catch (err) {
        console.error("Error formatting event details:", err, details);
        return {
          destination: '',
          activities: [],
          pricing: ['Prix non spécifié'],
          registration: '',
          contact: 'Contact non spécifié',
          email: 'Email non spécifié',
          practicalInfo: ['Information non disponible']
        };
      }
    },
  },
  mounted() {
    // Charger les événements depuis l'API
    this.fetchEvents();
    
    // Initialize Intersection Observer to trigger animations
    const sections = document.querySelectorAll('.animate-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
}
</script>

<style scoped>
.evenement {
  min-height: 100vh;
}

/* Hero Section */
.events-hero {
  background: linear-gradient(135deg, #fff 0%, #f5f7fa 100%);
  padding: 112px 64px 80px;
  position: relative;
  overflow: hidden;
  text-align: center;
  border-radius: 0 0 40px 40px;
}

.events-hero::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(93, 200, 230, 0.05) 0%,
    rgba(93, 200, 230, 0.15) 100%
  );
  border-radius: 0 0 0 100%;
  z-index: 0;
}

.events-hero-content {
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.events-hero-title {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(90deg, #eb1a3a 0%, #fbb018 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.5px;
  margin-bottom: 24px;
}

.events-hero-description {
  font-size: 18px;
  line-height: 1.7;
  color: #4d5259;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.events-hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* Events Section */
.events-section {
  max-width: 1200px;
  margin: 32px auto;
}

.events-header {
  text-align: center;
  margin-bottom: 60px;
}

.events-title {
  font-size: 42px;
  line-height: 1.3;
  color: #2A3040;
  position: relative;
  display: inline-block;
  padding-bottom: 20px;
}

.events-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  border-radius: 2px;
}

.events-description {
  font-size: 18px;
  line-height: 1.7;
  color: #4D5259;
  max-width: 768px;
  margin: 24px auto 0;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
}

.event-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.event-image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.event-card:hover .event-image {
  transform: scale(1.05);
}

.event-date {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.day {
  font-size: 24px;
  font-weight: 800;
  color: #EB1A3A;
}

.month {
  font-size: 14px;
  font-weight: 600;
  color: #4D5259;
}

.event-content {
  padding: 30px;
}

.event-title {
  font-size: 24px;
  font-weight: 700;
  color: #2A3040;
  margin-bottom: 16px;
}

.event-description {
  font-size: 16px;
  line-height: 1.6;
  color: #4D5259;
  margin-bottom: 20px;
}

.event-details-container {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail {
  display: flex;
  align-items: center;
  color: #4D5259;
}

.detail i {
  width: 20px;
  margin-right: 12px;
  color: #FBB018;
  font-size: 16px;
}

.event-details-expanded {
  margin-top: 20px;
  border-top: 1px dashed #ddd;
  padding-top: 20px;
}

.event-btn {
  width: 100%;
  margin-top: 10px;
}

/* Call to Action */
.events-cta {
  max-width: 1200px;
  margin: 32px auto;
  background: linear-gradient(135deg, #EB1A3A 0%, #FBB018 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 768px;
  margin: 0 auto;
}

.cta-title {
  font-size: 36px;
  color: white;
  margin-bottom: 20px;
}

.cta-description {
  font-size: 18px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
}

.cta-btn {
  background-color: white;
  color: #EB1A3A;
  font-weight: 700;
}

.cta-btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  color: #EB1A3A;
}

@media (max-width: 991px) {
  .events-hero {
    padding: 100px 20px 60px;
    border-radius: 0 0 30px 30px;
  }

  .events-hero-title {
    font-size: 36px;
    margin-bottom: 16px;
  }
  
  .events-hero-description {
    font-size: 16px;
    margin-bottom: 30px;
  }
  
  .events-hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    gap: 12px;
  }
  
  .events-hero-actions .btn {
    width: 100%;
  }

  .events-section {
    padding: 40px 20px;
    margin: 0 auto;
  }
  
  .events-header {
    margin-bottom: 40px;
  }

  .events-title {
    font-size: 32px;
    padding-bottom: 15px;
  }
  
  .events-description {
    font-size: 16px;
    padding: 0 16px;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 10px;
  }
  
  .event-card {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .event-image-container {
    height: 200px;
  }
  
  .event-content {
    padding: 20px;
  }
  
  .event-title {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  .event-description {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .event-details-container {
    padding: 15px;
    margin-bottom: 16px;
  }
  
  .event-details {
    margin-bottom: 15px;
  }
  
  .detail {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    color: #4D5259;
  }
  
  .detail i {
    width: 20px;
    margin-right: 12px;
    color: #FBB018;
    font-weight: bold;
  }
  
  .events-cta {
    padding: 40px 20px;
    margin: 32px auto;
    border-radius: 20px;
  }
  
  .cta-title {
    font-size: 28px;
    margin-bottom: 16px;
  }
  
  .cta-description {
    font-size: 16px;
    margin-bottom: 30px;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 280px;
  }
}

@media (max-width: 767px) {
  .modal-container {
    width: 95%;
    max-height: 85vh;
  }
  
  .modal-columns {
    flex-direction: column;
  }
  
  .modal-flyer {
    height: 200px;
  }
  
  .flyer-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .modal-details {
    padding: 20px 16px;
    max-height: unset;
  }
  
  .modal-title {
    font-size: 22px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }
  
  .section-title {
    font-size: 16px;
  }
  
  .modal-info-section {
    margin-bottom: 20px;
  }
  
  .date-info {
    font-size: 16px;
  }
  
  .modal-actions {
    margin-top: 24px;
    flex-direction: column;
    gap: 12px;
  }
  
  .modal-btn {
    width: 100%;
  }
  
  .modal-close {
    top: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
  
  .pratical-info li {
    padding: 8px 8px 8px 16px;
  }
}

@media (max-width: 480px) {
  .events-hero-title {
    font-size: 32px;
  }
  
  .events-title {
    font-size: 28px;
  }
  
  .event-image-container {
    height: 180px;
  }
  
  .event-date {
    top: 12px;
    right: 12px;
    padding: 8px;
  }
  
  .day {
    font-size: 20px;
  }
  
  .month {
    font-size: 12px;
  }
  
  .modal-flyer {
    height: 180px;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
}

.modal-container {
  background-color: white;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  overflow: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.modal-close:hover {
  background-color: #EB1A3A;
  color: white;
  transform: rotate(90deg);
}

.modal-content {
  padding: 0;
}

.modal-columns {
  display: flex;
  flex-direction: row;
}

.modal-flyer {
  flex: 1;
  background: #f5f7fa;
}

.flyer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.modal-details {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  max-height: 90vh;
}

.modal-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 15px;
}

.modal-info-section {
  margin-bottom: 25px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #2A3040;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.section-icon {
  color: #FBB018;
  margin-right: 10px;
  font-size: 20px;
}

.date-info {
  font-weight: 600;
  color: #EB1A3A;
  font-size: 18px;
  margin-bottom: 5px;
}

.modal-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.modal-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  line-height: 1.5;
}

.modal-list li::before {
  content: '•';
  color: #FBB018;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.pratical-info li {
  border-left: 3px solid #FBB018;
  padding-left: 15px;
  margin-bottom: 10px;
  background-color: rgba(251, 176, 24, 0.05);
  padding: 10px 10px 10px 20px;
  border-radius: 0 8px 8px 0;
}

.pratical-info li::before {
  content: none;
}

.modal-actions {
  margin-top: 40px;
  display: flex;
  gap: 15px;
}

.modal-btn {
  flex: 1;
}

@media (max-width: 991px) {
  .modal-columns {
    flex-direction: column;
  }
  
  .modal-flyer {
    height: 300px;
  }
  
  .modal-details {
    padding: 25px;
  }
  
  .modal-title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

.rich-text img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
}

/* Styles pour le chargement et les erreurs */
.loading-container,
.error-container,
.no-events-container {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #EB1A3A;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text,
.error-message,
.no-events-message {
  font-size: 18px;
  margin-bottom: 20px;
}

.error-message {
  color: #EB1A3A;
  font-weight: 600;
}

.no-events-message {
  font-weight: 600;
  font-size: 20px;
}
</style> 