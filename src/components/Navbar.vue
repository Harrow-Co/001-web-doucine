<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" @click="closeMenu">
        <img
          class="navbar-logo"
        src="@/assets/logo_doucine.png"
        alt="Logo"
      />
      </router-link>
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <div class="nav-links">
          <router-link to="/" class="nav-link" @click="closeMenu">Accueil</router-link>
          <router-link to="/evenement" class="nav-link" @click="closeMenu">Événements</router-link>
          <router-link to="/apropos" class="nav-link" @click="closeMenu">À Propos</router-link>
          <div class="nav-dropdown" @click="closeMenu">
            <span class="nav-link">Nos Actions</span>
            <img
              class="dropdown-icon"
              src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55"
              alt="Dropdown"
            />
          </div>
        </div>
        <div class="nav-actions">
          <button class="btn btn-secondary" @click="closeMenu">Rejoindre</button>
          <button class="btn btn-primary" @click="closeMenu">S'inscrire</button>
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
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      // Ferme le menu si on est sur mobile
      if (window.innerWidth <= 991) {
        this.isMenuOpen = false;
      }
    }
  },
  mounted() {
    // Gestionnaire d'événement pour fermer le menu au redimensionnement
    window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
        this.isMenuOpen = false;
      }
    });

    // Fermer le menu lors d'un changement de route
    this.$router.afterEach(() => {
      this.closeMenu();
    });
  },
  beforeDestroy() {
    // Nettoyage de l'écouteur d'événement
    window.removeEventListener('resize', () => {});
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

.nav-actions {
  display: flex;
  align-items: center;
  gap: 16px;
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

.hamburger span {
  width: 30px;
  height: 3px;
  background: #EB1A3A;
  border-radius: 10px;
  transition: all 0.3s linear;
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
