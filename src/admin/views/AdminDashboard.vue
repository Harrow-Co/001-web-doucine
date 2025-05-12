<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <div class="logo">
        <h1>DOUCINE Admin</h1>
      </div>
      <nav class="admin-nav">
        <router-link :to="{ name: 'admin-events' }" class="nav-link">
          <i class="fas fa-calendar-alt"></i> Événements
        </router-link>
        <!-- Autres liens de navigation peuvent être ajoutés ici -->
      </nav>
    </header>
    
    <main class="admin-content">
      <router-view />
    </main>
    
    <footer class="admin-footer">
      <p>&copy; {{ new Date().getFullYear() }} DOUCINE - Panel d'administration</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard'
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.admin-header {
  background-color: #333;
  color: white;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  padding: 15px 0;
}

.admin-nav {
  display: flex;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 20px 15px;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s;
}

.nav-link i {
  margin-right: 8px;
}

.nav-link:hover, .router-link-active {
  background-color: #555;
}

.admin-content {
  flex: 1;
  padding: 20px;
}

.admin-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 15px;
  font-size: 14px;
}

@media (max-width: 600px) {
  .admin-header {
    flex-direction: column;
    padding: 10px;
  }
  
  .admin-nav {
    width: 100%;
    justify-content: center;
  }
  
  .nav-link {
    padding: 10px 15px;
  }
}
</style>
