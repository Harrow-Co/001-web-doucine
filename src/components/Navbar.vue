<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img
        class="navbar-logo"
        src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b50c9fde289ac20a7a765b5b6329bc7df93b9511011838f82a9d74943f3e2070"
        alt="Logo"
      />
      <button class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
        <div class="nav-links">
          <router-link to="/" class="nav-link">Accueil</router-link>
          <router-link to="/" class="nav-link">Événements</router-link>
          <router-link to="/" class="nav-link">À propos</router-link>
          <div class="nav-dropdown">
            <span class="nav-link">Nos Actions</span>
            <img
              class="dropdown-icon"
              src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fee1f4da4fbc0ac2471ce1f6c2ea6132c2a43490c7dcf7518142e53de96c1a55"
              alt="Dropdown"
            />
          </div>
        </div>
        <div class="nav-actions">
          <button class="btn btn-secondary">Rejoindre</button>
          <button class="btn btn-primary">S'inscrire</button>
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
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #c1121f;
  min-height: 72px;
  width: 100%;
  padding: 0 64px;
  display: flex;
  align-items: center;
  position: fixed;
}

.navbar-container {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px 100px;
  justify-content: space-between;
}

.navbar-logo {
  width: 50px;
  aspect-ratio: 0.92;
  object-fit: contain;
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
  color: #000;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dropdown-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
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
  background: #000;
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
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
    gap: 10px;
    margin-top: 20px;
  }

  .nav-actions button {
    width: 100%;
  }

  .nav-dropdown {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
