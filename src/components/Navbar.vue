<template>
  <nav class="navbar" aria-label="Navigation principale">
    <div class="navbar-container">
      <router-link to="/" @click="closeMenu" aria-label="Accueil - Doucine">
        <img
          class="navbar-logo"
          src="@/assets/logo_doucine.png"
          alt="Logo Doucine"
        />
      </router-link>
      <button class="hamburger" @click="toggleMenu" aria-expanded="isMenuOpen" aria-label="Menu principal">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }" role="navigation">
        <div class="nav-links">
          <router-link to="/" class="nav-link" @click="closeMenu">Accueil</router-link>
          <router-link to="/evenement" class="nav-link" @click="closeMenu">Événements</router-link>
          <router-link to="/apropos" class="nav-link" @click="closeMenu">À Propos</router-link>
          <div class="nav-dropdown" 
               @mouseover="handleDropdownHover" 
               @mouseleave="handleDropdownLeave" 
               @click="toggleDropdown"
               role="menu"
               aria-haspopup="true"
               :aria-expanded="dropdownOpen">
            <span class="nav-link" tabindex="0" role="menuitem">Nos Actions</span>
            <img
              class="dropdown-icon"
              src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55"
              alt="Ouvrir le menu déroulant"
            />
            <div class="dropdown-menu" :class="{ 'is-active': dropdownOpen }" role="menu">
              <router-link to="/actions/domicile" class="dropdown-item" @click="closeMenu" role="menuitem">
                <i class="fas fa-home dropdown-icon-item" aria-hidden="true"></i>
                Soutien à domicile
              </router-link>
              <router-link to="/actions/activites" class="dropdown-item" @click="closeMenu" role="menuitem">
                <i class="fas fa-users dropdown-icon-item" aria-hidden="true"></i>
                Activités sociales
              </router-link>
              <router-link to="/actions/bien-etre" class="dropdown-item" @click="closeMenu" role="menuitem">
                <i class="fas fa-spa dropdown-icon-item" aria-hidden="true"></i>
                Ateliers bien-être
              </router-link>
              <router-link to="/actions/prevention" class="dropdown-item" @click="closeMenu" role="menuitem">
                <i class="fas fa-heartbeat dropdown-icon-item" aria-hidden="true"></i>
                Prévention santé
              </router-link>
              <router-link to="/actions/administratif" class="dropdown-item" @click="closeMenu" role="menuitem">
                <i class="fas fa-file-alt dropdown-icon-item" aria-hidden="true"></i>
                Soutien administratif
              </router-link>
            </div>
          </div>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </li>
        </div>
        <div class="nav-actions">
          <button class="btn btn-secondary" @click="showContactModal">Rejoindre</button>
          <button class="btn btn-primary" @click="showRegistrationModal">S'inscrire</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      isMenuOpen: false,
      dropdownOpen: false,
      isMobile: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Annoncer l'état du menu pour les lecteurs d'écran
      this.announceMenuState();
    },
    closeMenu() {
      // Ferme le menu si on est sur mobile
      if (this.isMobile) {
        this.isMenuOpen = false;
      }
      this.dropdownOpen = false;
    },
    showContactModal() {
      // Ferme le menu
      this.closeMenu();
      
      // Alerte temporaire en attendant l'implémentation
      alert("La fonctionnalité de contact sera bientôt disponible. Veuillez nous contacter par email à contact@association-doucine.fr");
    },
    showRegistrationModal() {
      // Ferme le menu
      this.closeMenu();
      
      // Pour l'instant, rediriger vers la page des événements
      this.$router.push('/evenement');
    },
    toggleDropdown(event) {
      // Sur mobile, on toggle le dropdown au clic
      if (this.isMobile) {
        event.preventDefault();
        this.dropdownOpen = !this.dropdownOpen;
        // Annoncer l'état du sous-menu pour les lecteurs d'écran
        this.announceDropdownState();
      }
    },
    handleDropdownHover() {
      // Sur desktop, on ouvre au survol
      if (!this.isMobile) {
        this.dropdownOpen = true;
      }
    },
    handleDropdownLeave() {
      // Sur desktop, on ferme quand on quitte la zone
      if (!this.isMobile) {
        this.dropdownOpen = false;
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 991;
    },
    announceMenuState() {
      // Aide à l'accessibilité: annonce l'état du menu principal
      const message = this.isMenuOpen ? 'Menu ouvert' : 'Menu fermé';
      this.announceForScreenReader(message);
    },
    announceDropdownState() {
      // Aide à l'accessibilité: annonce l'état du sous-menu
      const message = this.dropdownOpen ? 'Sous-menu ouvert' : 'Sous-menu fermé';
      this.announceForScreenReader(message);
    },
    announceForScreenReader(message) {
      // Crée un élément pour les lecteurs d'écran
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('class', 'sr-only');
      announcement.textContent = message;
      document.body.appendChild(announcement);
      
      // Supprime l'élément après un court délai
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    handleKeyDown(event) {
      // Gestion du clavier pour l'accessibilité
      if (event.key === 'Escape') {
        this.closeMenu();
      }
      
      // Permettre la navigation par clavier dans le menu déroulant
      if (this.dropdownOpen && event.key === 'Tab') {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        const firstItem = dropdownItems[0];
        const lastItem = dropdownItems[dropdownItems.length - 1];
        
        if (event.shiftKey && document.activeElement === firstItem) {
          // Si l'utilisateur fait Shift+Tab sur le premier élément, fermer le dropdown
          this.dropdownOpen = false;
        } else if (!event.shiftKey && document.activeElement === lastItem) {
          // Si l'utilisateur fait Tab sur le dernier élément, fermer le dropdown
          this.dropdownOpen = false;
        }
      }
    }
  },
  mounted() {
    this.checkMobile();
    
    // Gestionnaire d'événement pour fermer le menu au redimensionnement
    window.addEventListener('resize', () => {
      this.checkMobile();
      if (!this.isMobile) {
        this.isMenuOpen = false;
      }
    });

    // Fermer le menu lors d'un changement de route
    this.$router.afterEach(() => {
      this.closeMenu();
    });
    
    // Fermer le dropdown quand on clique à l'extérieur
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav-dropdown') && this.dropdownOpen) {
        this.dropdownOpen = false;
      }
    });
    
    // Gestionnaire d'événement pour l'accessibilité clavier
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    // Nettoyage des écouteurs d'événements
    window.removeEventListener('resize', this.checkMobile);
    document.removeEventListener('click', () => {});
    document.removeEventListener('keydown', this.handleKeyDown);
  }
};
</script>

<style scoped>
.navbar {
  background-color: #fff;
  min-height: 72px;
  width: 100%;
  padding: 0 64px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.navbar-container {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px 100px;
  justify-content: space-between;
}

.navbar-logo {
  width: 55px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.navbar-menu {
  display: flex;
  min-width: 240px;
  align-items: center;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
}

.nav-links {
  display: flex;
  min-width: 240px;
  align-items: center;
  gap: 32px;
}

.nav-link {
  color: #2A3040;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding: 5px 0;
}

.nav-link:hover {
  color: #EB1A3A;
}

.nav-link:focus {
  outline: none;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  transition: width 0.3s ease;
}

.nav-link:hover:after {
  width: 100%;
}

.nav-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  position: relative;
}

.dropdown-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
  filter: invert(69%) sepia(61%) saturate(490%) hue-rotate(164deg) brightness(94%) contrast(87%);
  transition: transform 0.3s ease;
}

.nav-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 12px;
  min-width: 250px;
  padding: 16px 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 5;
}

.dropdown-menu.is-active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #2A3040;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.dropdown-item:hover {
  background-color: rgba(235, 26, 58, 0.05);
  color: #EB1A3A;
}

.dropdown-item:focus {
  outline: none;
  background-color: rgba(235, 26, 58, 0.03);
}

.dropdown-icon-item {
  margin-right: 12px;
  color: #FBB018;
  width: 16px;
  text-align: center;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.btn {
  cursor: pointer;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:focus {
  outline: none;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger:focus {
  outline: none;
}

.hamburger span {
  width: 30px;
  height: 3px;
  background: #EB1A3A;
  border-radius: 10px;
  transition: all 0.3s linear;
}

/* Classe pour les éléments destinés aux lecteurs d'écran uniquement */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 991px) {
  .navbar {
    padding: 0 20px;
  }

  .navbar-container {
    max-width: 100%;
  }

  .hamburger {
    display: flex;
  }

  .navbar-menu {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    width: 100%;
    background: #fff;
    flex-direction: column;
    padding: 30px 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 20px 20px;
  }

  .navbar-menu.is-active {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .nav-actions {
    flex-direction: column;
    width: 100%;
    gap: 15px;
    margin-top: 25px;
  }

  .nav-actions button {
    width: 100%;
  }

  .nav-dropdown {
    width: 100%;
    justify-content: space-between;
  }
  
  .dropdown-menu {
    position: relative;
    width: 100%;
    min-width: unset;
    box-shadow: none;
    border-radius: 8px;
    padding: 0;
    background-color: #f9f9f9;
    margin-top: 10px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  
  .dropdown-menu.is-active {
    max-height: 300px;
    padding: 10px 0;
  }
  
  .dropdown-item {
    padding: 10px 15px;
    font-size: 15px;
  }
}

.router-link-active {
  color: #EB1A3A;
  font-weight: 600;
}

.router-link-active:after {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
}
</style>

