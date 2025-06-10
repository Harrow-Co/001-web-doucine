<template>
  <div class="admin-container w-full">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Gestion des Événements</h1>
      
      <div>
        <button 
          class="btn btn-primary" 
          @click="navigateToCreate"
        >
          <i class="fas fa-plus"></i> Nouvel Événement
        </button>
      </div>
    </div>

    <SearchAndFilter 
      :search-query="searchQuery" 
      :view-mode="viewMode"
      @search="onSearch"
      @view-mode-change="onViewModeChange"
      class="mb-6"
    />

    <LoadingState v-if="loading" />

    <ErrorState 
      v-else-if="error" 
      :error-message="error" 
      @retry="fetchEvents" 
    />

    <EmptyState 
      v-else-if="filteredEvents.length === 0" 
      :has-search-query="!!searchQuery.trim()" 
      @create="navigateToCreate" 
    />

    <EventGrid 
      v-else-if="viewMode === 'grid'" 
      :events="filteredEvents"
      @view="viewEvent"
      @edit="editEvent"
      @delete="confirmDelete"
      @image-error="handleImageError"
    />

    <EventTable 
      v-else 
      :events="filteredEvents"
      @view="viewEvent"
      @edit="editEvent"
      @delete="confirmDelete"
    />

    <DeleteModal 
      v-if="showDeleteModal" 
      :event="eventToDelete"
      @cancel="cancelDelete"
      @confirm="deleteEvent"
    />
  </div>
</template>

<script>
import eventService from '../services/eventService';
import SearchAndFilter from '../components/events/list/SearchAndFilter.vue';
import LoadingState from '../components/events/list/LoadingState.vue';
import ErrorState from '../components/events/list/ErrorState.vue';
import EmptyState from '../components/events/list/EmptyState.vue';
import EventGrid from '../components/events/list/EventGrid.vue';
import EventTable from '../components/events/list/EventTable.vue';
import DeleteModal from '../components/events/DeleteModal.vue';

export default {
  name: 'EventList',
  components: {
    SearchAndFilter,
    LoadingState,
    ErrorState,
    EmptyState,
    EventGrid,
    EventTable,
    DeleteModal
  },
  data() {
    return {
      events: [],
      filteredEvents: [],
      loading: true,
      error: null,
      showDeleteModal: false,
      eventToDelete: null,
      searchQuery: '',
      viewMode: 'grid' // 'grid' ou 'list'
    };
  },
  created() {
    this.fetchEvents();
    
    // Récupérer la préférence d'affichage si elle existe
    const savedViewMode = localStorage.getItem('admin_events_view_mode');
    if (savedViewMode) {
      this.viewMode = savedViewMode;
    }
  },
  watch: {
    viewMode(newValue) {
      // Sauvegarder la préférence d'affichage
      localStorage.setItem('admin_events_view_mode', newValue);
    }
  },
  methods: {
    async fetchEvents() {
      this.loading = true;
      this.error = null;
      
      try {
        this.events = await eventService.getAllEvents();
        this.filteredEvents = [...this.events];
      } catch (error) {
        console.error('Failed to fetch events:', error);
        this.error = 'Impossible de charger les événements. Veuillez réessayer plus tard.';
      } finally {
        this.loading = false;
      }
    },
    
    onSearch(query) {
      this.searchQuery = query;
      this.filterEvents();
    },
    
    onViewModeChange(mode) {
      this.viewMode = mode;
    },
    
    filterEvents() {
      if (!this.searchQuery.trim()) {
        this.filteredEvents = [...this.events];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredEvents = this.events.filter(event => {
        return (
          (event.titre && event.titre.toLowerCase().includes(query)) ||
          (event.lieu && event.lieu.toLowerCase().includes(query))
        );
      });
    },
    
    navigateToCreate() {
      this.$router.push({ name: 'admin-event-create' });
    },
    
    viewEvent(id) {
      this.$router.push({ name: 'admin-event-details', params: { id } });
    },
    
    editEvent(id) {
      this.$router.push({ name: 'admin-event-edit', params: { id } });
    },
    
    confirmDelete(event) {
      this.eventToDelete = event;
      this.showDeleteModal = true;
    },
    
    cancelDelete() {
      this.showDeleteModal = false;
      this.eventToDelete = null;
    },
    
    async deleteEvent() {
      if (!this.eventToDelete) return;
      
      try {
        await eventService.deleteEvent(this.eventToDelete.id);
        // Retirer l'événement de la liste locale
        this.events = this.events.filter(e => e.id !== this.eventToDelete.id);
        this.filteredEvents = this.filteredEvents.filter(e => e.id !== this.eventToDelete.id);
        this.showDeleteModal = false;
        this.eventToDelete = null;
        
        // Afficher un message de succès
        alert('Événement supprimé avec succès');
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Erreur lors de la suppression de l\'événement');
      }
    },
    
    handleImageError(event, id) {
      // Handle image loading error
      console.error(`Erreur lors de la chargement de l'image de l'événement ${id}:`, event);
    }
  }
};
</script>


