<template>
  <div class="flex flex-col min-h-screen font-sans bg-gray-50">
    <!-- Modern Floating Header -->
    <header class="sticky top-4 z-30 px-4">
      <div class="bg-white rounded-2xl shadow-xl mx-auto max-w-7xl overflow-hidden">
        <div class="bg-gradient-to-r from-primary to-primary-600 p-1">
          <div class="bg-white rounded-xl">
            <div class="flex items-center justify-between px-6 py-3">
              <!-- Logo with gradient background -->
              <div class="flex items-center">
                <div class="bg-gradient-to-r from-primary to-primary-600 p-2 rounded-xl shadow-md">
                  <img src="@/assets/logo_doucine.png" alt="Logo Doucine" class="h-10" />
                </div>
              </div>
              
              <!-- Modern Navigation Pills -->
              <nav class="flex-1 flex items-center justify-center">
                <div class="hidden md:flex bg-gray-100 rounded-full p-1 shadow-inner mx-4">
                  <router-link 
                    :to="{ name: 'admin-dashboard' }" 
                    class="px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center"
                    :class="$route.name === 'admin-dashboard' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-primary'"
                  >
                    <i class="fas fa-home mr-2"></i> Accueil
                  </router-link>
                  
                  <router-link 
                    :to="{ name: 'admin-events' }" 
                    class="px-6 py-2 rounded-full font-medium transition-all duration-300 flex items-center"
                    :class="$route.name === 'admin-events' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-primary'"
                  >
                    <i class="fas fa-calendar-alt mr-2"></i> Événements
                  </router-link>
                </div>
              </nav>
              
              <!-- User Menu with modern styling -->
              <div class="flex items-center">
                <div class="flex items-center mr-3 bg-gray-100 rounded-full py-1 px-3">
                  <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary to-primary-600 text-white rounded-full font-bold text-sm mr-2 shadow-sm">
                    <span>{{ username.charAt(0).toUpperCase() }}</span>
                  </div>
                  <span class="hidden md:block text-sm text-gray-700 font-medium">{{ username }}</span>
                </div>
                
                <button 
                  @click="logout" 
                  class="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center"
                  title="Déconnexion"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  <span class="hidden md:inline ml-2">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Navigation - Modern Floating Pills -->
      <div class="md:hidden mt-3">
        <div class="bg-white rounded-full shadow-lg p-1 flex justify-center">
          <router-link 
            :to="{ name: 'admin-dashboard' }" 
            class="flex flex-col items-center px-6 py-2 rounded-full transition-all duration-300"
            :class="$route.name === 'admin-dashboard' ? 'bg-primary text-white' : 'text-gray-600'"
          >
            <i class="fas fa-home text-lg"></i>
            <span class="text-xs mt-1">Accueil</span>
          </router-link>
          
          <router-link 
            :to="{ name: 'admin-events' }" 
            class="flex flex-col items-center px-6 py-2 rounded-full transition-all duration-300"
            :class="$route.name === 'admin-events' ? 'bg-primary text-white' : 'text-gray-600'"
          >
            <i class="fas fa-calendar-alt text-lg"></i>
            <span class="text-xs mt-1">Événements</span>
          </router-link>
        </div>
      </div>
    </header>
    
    <!-- Main Content with more padding for floating header -->
    <main class="flex-1 p-4 pt-20 overflow-auto">
      <div class="w-full mx-auto max-w-full">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import authService from '../services/authService';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      username: 'admin'
    };
  },
  computed: {
    currentDate() {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return now.toLocaleDateString('fr-FR', options);
    }
  },
  created() {
    // Récupérer les informations de l'utilisateur connecté
    this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      try {
        const user = await authService.getCurrentUser();
        if (user && user.username) {
          this.username = user.username;
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
      }
    },
    logout() {
      authService.logout();
      this.$router.push({ name: 'admin-login' });
    }
  }
};
</script>
