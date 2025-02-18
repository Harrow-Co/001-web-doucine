<template>
  <nav class="navbar">
    <div class="navbar-container">
      <img
        class="navbar-logo"
        src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b50c9fde289ac20a7a765b5b6329bc7df93b9511011838f82a9d74943f3e2070"
        alt="Logo"
      />
      <div class="navbar-content"></div>
      <div class="navbar-menu">
        <div class="nav-links">
          <router-link to="/" class="nav-link">Accueil</router-link>
          <router-link to="/events" class="nav-link">Événements</router-link>
          <router-link to="/about" class="nav-link">À propos</router-link>
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
}

.navbar-container {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px 100px;
  justify-content: space-between;
}

.navbar-logo {
  width: 35px;
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

@media (max-width: 991px) {
  .navbar {
    padding: 0 20px;
  }

  .navbar-container {
    max-width: 100%;
  }

  .navbar-menu {
    max-width: 100%;
  }
}
</style>
