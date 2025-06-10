<template>
  <div class="admin-container w-full">
    <!-- Welcome Banner avec nombre d'événements intégré -->
    <div class="dashboard-welcome mb-6">
      <div class="relative z-10 flex-1">
        <h1 class="text-xl font-bold mb-2">Bienvenue sur votre panel</h1>
        <p class="text-white text-opacity-80 text-sm mb-4">Gérez votre association Doucine</p>
        
        <div class="flex items-center mt-4 bg-white bg-opacity-20 rounded-lg p-4 inline-flex">
          <div class="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center text-white mr-4">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div>
            <p class="text-sm text-white text-opacity-90 m-0">Événements</p>
            <h3 class="text-2xl font-bold text-white m-0">{{ eventCount }}</h3>
          </div>
        </div>
      </div>
      
      <div class="text-5xl ml-6 text-white text-opacity-80 relative z-10 hidden md:block">
        <i class="fas fa-chart-line"></i>
      </div>
      
      <!-- Cercle décoratif -->
      <div class="absolute top-0 right-0 w-56 h-56 bg-white bg-opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
    </div>
    
    <!-- Action Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <ActionCard 
        title="Créer un événement" 
        description="Ajoutez un nouvel événement à votre calendrier" 
        icon="fas fa-plus"
        button-text="Créer"
        button-url="/admin/events/create"
        color="primary"
      />
      
      <ActionCard 
        title="Gérer les événements" 
        description="Consultez et modifiez vos événements" 
        icon="fas fa-edit"
        button-text="Gérer"
        button-url="/admin/events"
        color="primary"
      />
    </div>
    
    <!-- Vues des événements -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="section-title mb-0">Vos événements</h2>
        <div class="flex space-x-2">
          <button 
            @click="activeView = 'list'" 
            class="px-3 py-1.5 rounded-md text-sm flex items-center"
            :class="activeView === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            <i class="fas fa-list mr-2"></i> Liste
          </button>
          <button 
            @click="activeView = 'calendar'" 
            class="px-3 py-1.5 rounded-md text-sm flex items-center"
            :class="activeView === 'calendar' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            <i class="fas fa-calendar mr-2"></i> Calendrier
          </button>
          
          <div class="relative ml-2">
            <select 
              v-model="sortOrder" 
              class="appearance-none bg-gray-100 border-none rounded-md py-1.5 pl-3 pr-8 text-sm cursor-pointer"
            >
              <option value="asc">Date croissante</option>
              <option value="desc">Date décroissante</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="bg-white rounded-xl p-6 text-center">
        <i class="fas fa-spinner animate-spin text-primary text-xl"></i>
        <p class="mt-2 text-gray-500">Chargement des événements...</p>
      </div>
      
      <div v-else-if="events.length === 0" class="bg-white rounded-xl p-6 text-center">
        <div class="text-4xl text-gray-200 mb-3">
          <i class="fas fa-calendar-times"></i>
        </div>
        <p class="text-gray-500 mb-4">Aucun événement disponible</p>
        <router-link :to="{ name: 'admin-event-create' }" class="btn btn-primary inline-flex">
          <i class="fas fa-plus mr-2"></i> Créer un événement
        </router-link>
      </div>
      
      <!-- Vue Liste -->
      <div v-else-if="activeView === 'list'" class="bg-white rounded-xl shadow-sm p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EventCard
            v-for="event in sortedEvents"
            :key="event.id"
            :title="event.titre"
            :day="formatDay(event.date)"
            :month="formatMonth(event.date)"
            :location="event.lieu"
            :time="event.horaire"
            @view="viewEvent(event.id)"
            @edit="editEvent(event.id)"
          />
        </div>
      </div>
      
      <!-- Vue Calendrier -->
      <div v-else-if="activeView === 'calendar'" class="flex flex-col md:flex-row gap-4">
        <div class="calendar-container md:w-2/3">
          <div class="calendar-header">
            <div class="flex items-center">
              <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-full">
                <i class="fas fa-chevron-left"></i>
              </button>
              <h3 class="text-lg font-semibold mx-4">{{ currentMonthName }} {{ currentYear }}</h3>
              <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-full">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          
          <div class="calendar-grid">
            <div v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']" :key="day" class="calendar-day-header">
              {{ day }}
            </div>
            
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index" 
              class="calendar-day"
              :class="{ 'bg-gray-50': !day.currentMonth }"
            >
              <div class="flex justify-center mb-2">
                <span 
                  class="calendar-day-number" 
                  :class="{ 'calendar-day-current': isToday(day.date) }"
                >
                  {{ day.dayNumber }}
                </span>
              </div>
              
              <div v-if="day.events.length > 0" class="flex flex-col space-y-1">
                <div 
                  v-for="event in day.events" 
                  :key="event.id" 
                  class="calendar-event"
                  @click="viewEvent(event.id)"
                >
                  {{ event.titre }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Liste simple des événements -->
        <div class="bg-white rounded-xl shadow-sm p-4 md:w-1/3">
          <h3 class="text-lg font-semibold mb-4 border-b pb-2">Tous les événements</h3>
          <div v-if="events.length === 0" class="text-center text-gray-500 py-4">
            Aucun événement disponible
          </div>
          <ul v-else class="divide-y">
            <li 
              v-for="event in sortedEvents" 
              :key="event.id"
              class="py-3 hover:bg-gray-50 rounded px-2 cursor-pointer"
              @click="viewEvent(event.id)"
            >
              <div class="flex items-center">
                <div class="w-10 h-10 flex-shrink-0 bg-primary rounded-full flex items-center justify-center text-white mr-3">
                  <span class="text-sm font-semibold">{{ formatDay(event.date) }}</span>
                </div>
                <div>
                  <h4 class="text-sm font-medium m-0">{{ event.titre }}</h4>
                  <p class="text-xs text-gray-500 m-0">{{ formatDate(event.date) }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventService from '../services/eventService';
import StatCard from '../components/dashboard/StatCard.vue';
import ActionCard from '../components/dashboard/ActionCard.vue';
import EventCard from '../components/dashboard/EventCard.vue';

export default {
  name: 'Dashboard',
  components: {
    StatCard,
    ActionCard,
    EventCard
  },
  data() {
    return {
      eventCount: 0,
      events: [],
      loading: true,
      activeView: 'list',
      sortOrder: 'asc',
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear()
    };
  },
  computed: {
    // Événements triés par date
    sortedEvents() {
      return [...this.events].sort((a, b) => {
        const dateA = this.extractDateAsNumber(a.date);
        const dateB = this.extractDateAsNumber(b.date);
        return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    },
    
    // Nom du mois actuel
    currentMonthName() {
      const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      return months[this.currentMonth];
    },
    
    // Jours du calendrier
    calendarDays() {
      const days = [];
      const date = new Date(this.currentYear, this.currentMonth, 1);
      
      // Déterminer le premier jour du mois
      const firstDay = date.getDay() || 7; // Transformer 0 (dimanche) en 7
      
      // Ajouter les jours du mois précédent
      const prevMonthDays = firstDay - 1;
      const prevMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
      const prevMonthYear = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
      const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
      
      for (let i = 0; i < prevMonthDays; i++) {
        const day = daysInPrevMonth - prevMonthDays + i + 1;
        const dayDate = new Date(prevMonthYear, prevMonth, day);
        days.push({
          date: dayDate,
          dayNumber: day,
          currentMonth: false,
          events: this.getEventsForDay(dayDate)
        });
      }
      
      // Ajouter les jours du mois actuel
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const dayDate = new Date(this.currentYear, this.currentMonth, i);
        days.push({
          date: dayDate,
          dayNumber: i,
          currentMonth: true,
          events: this.getEventsForDay(dayDate)
        });
      }
      
      // Ajouter les jours du mois suivant pour compléter la grille (jusqu'à 42 jours)
      const nextMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
      const nextMonthYear = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
      const totalDaysToShow = 42;
      const remainingDays = totalDaysToShow - days.length;
      
      for (let i = 1; i <= remainingDays; i++) {
        const dayDate = new Date(nextMonthYear, nextMonth, i);
        days.push({
          date: dayDate,
          dayNumber: i,
          currentMonth: false,
          events: this.getEventsForDay(dayDate)
        });
      }
      
      return days;
    }
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const events = await eventService.getAllEvents();
        this.eventCount = events.length;
        this.events = events;
        this.loading = false;
        
        // Loguer les données pour debug
        console.log('Données des événements:', events);
        if (events.length > 0) {
          console.log('Structure de date exemple:', events[0].date);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        this.loading = false;
      }
    },
    
    // Extraire une date sous forme de nombre pour le tri
    extractDateAsNumber(date) {
      if (!date) return 0;
      
      try {
        if (date.annee && date.mois && date.jour) {
          // Format : {jour: "08", mois: "juin", annee: "2024"}
          const months = {
            'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
            'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12
          };
          
          const year = parseInt(date.annee);
          const month = months[date.mois.toLowerCase()] || 1;
          const day = parseInt(date.jour);
          
          // Retourner un nombre format YYYYMMDD
          return year * 10000 + month * 100 + day;
        }
      } catch (e) {
        console.error('Erreur d\'extraction de date:', e);
      }
      
      return 0;
    },
    
    // Formater le jour
    formatDay(date) {
      if (!date || !date.jour) return '';
      return date.jour;
    },
    
    // Formater le mois
    formatMonth(date) {
      if (!date || !date.mois) return '';
      return date.mois;
    },
    
    // Vérifier si une date est aujourd'hui
    isToday(date) {
      const today = new Date();
      return date.getDate() === today.getDate() && 
             date.getMonth() === today.getMonth() && 
             date.getFullYear() === today.getFullYear();
    },
    
    // Obtenir les événements pour un jour spécifique
    getEventsForDay(date) {
      // Si pas d'événements, retourner un tableau vide
      if (!this.events || !Array.isArray(this.events) || this.events.length === 0) {
        return [];
      }

      // Formatage de la date du calendrier pour la comparaison (YYYY-MM-DD)
      const calendarYear = date.getFullYear().toString();
      const calendarMonth = (date.getMonth() + 1).toString().padStart(2, '0');
      const calendarDay = date.getDate().toString().padStart(2, '0');
      
      // Loguer pour debug
      if (date.getDate() === 20 && date.getMonth() === 1) { // 20 février
        console.log(`Recherche d'événements pour le 20 février: ${calendarDay}-${calendarMonth}-${calendarYear}`);
      }
      if (date.getDate() === 10 && date.getMonth() === 2) { // 10 mars
        console.log(`Recherche d'événements pour le 10 mars: ${calendarDay}-${calendarMonth}-${calendarYear}`);
      }
      if (date.getDate() === 10 && date.getMonth() === 8) { // 10 septembre
        console.log(`Recherche d'événements pour le 10 septembre: ${calendarDay}-${calendarMonth}-${calendarYear}`);
      }
      
      // Correspondance des noms de mois français aux numéros de mois
      const monthNameToNumber = {
        'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04', 
        'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08', 
        'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12',
        // Ajout de variations communes
        'fev': '02', 'fevrier': '02', 'fév': '02', 'mar': '03'
      };
      
      // Correspondance des abréviations en majuscules
      const monthAbbrToNumber = {
        'JAN': '01', 'FEV': '02', 'MAR': '03', 'AVR': '04',
        'MAI': '05', 'JUN': '06', 'JUI': '07', 'AOU': '08',
        'SEP': '09', 'OCT': '10', 'NOV': '11', 'DEC': '12'
      };
      
      // Filtrer les événements pour ce jour
      return this.events.filter(event => {
        let eventDate = event.date;
        
        // Vérifier si la date est dans date_json (pour les données SQLite)
        if (!eventDate && event.date_json) {
          try {
            eventDate = JSON.parse(event.date_json);
          } catch (e) {
            console.error(`Erreur lors du parsing de date_json pour l'événement "${event.titre}":`, e);
            return false;
          }
        }
        
        // Vérifier que les données de date sont complètes
        if (!eventDate || !eventDate.jour || !eventDate.mois || !eventDate.annee) {
          return false;
        }
        
        // Normaliser le jour de l'événement
        const eventDay = eventDate.jour.toString().padStart(2, '0');
        
        // Récupérer le mois de l'événement
        let eventMonth = '00'; // Valeur par défaut si non reconnu
        
        // Vérifier d'abord si c'est une abréviation en majuscules (comme SEP)
        if (monthAbbrToNumber[eventDate.mois]) {
          eventMonth = monthAbbrToNumber[eventDate.mois];
        } 
        // Sinon, essayer en minuscules
        else {
          const eventMonthLower = eventDate.mois.toLowerCase();
          eventMonth = monthNameToNumber[eventMonthLower] || '00';
        }
        
        // Normaliser l'année de l'événement
        const eventYear = eventDate.annee.toString();
        
        // Vérifier la correspondance de la date
        const dayMatches = eventDay === calendarDay;
        const monthMatches = eventMonth === calendarMonth;
        const yearMatches = eventYear === calendarYear;
        
        const isMatch = dayMatches && monthMatches && yearMatches;
        
        // Journaliser pour déboguer des dates spécifiques
        if ((date.getDate() === 20 && date.getMonth() === 1) || // 20 février
            (date.getDate() === 10 && date.getMonth() === 2) || // 10 mars
            (date.getDate() === 10 && date.getMonth() === 8)) { // 10 septembre
          console.log({
            eventTitle: event.titre,
            eventDate: `${eventDay}-${eventMonth}-${eventYear}`,
            originalMonth: eventDate.mois,
            calendarDate: `${calendarDay}-${calendarMonth}-${calendarYear}`,
            dayMatches, monthMatches, yearMatches,
            isMatch
          });
        }
        
        return isMatch;
      });
    },
    
    // Passer au mois précédent
    previousMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    
    // Passer au mois suivant
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    
    viewEvent(id) {
      this.$router.push({ name: 'admin-event-details', params: { id } });
    },
    
    editEvent(id) {
      this.$router.push({ name: 'admin-event-edit', params: { id } });
    },
    
    // Formater la date complète
    formatDate(date) {
      if (!date || !date.jour || !date.mois || !date.annee) return 'Date inconnue';
      return `${date.jour} ${date.mois} ${date.annee}`;
    }
  }
};
</script>

<style scoped>
.calendar-container {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
</style>

