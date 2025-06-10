<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Connexion Admin</h1>
        <p>Panneau d'administration Association Doucine</p>
      </div>
      
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            class="form-control" 
            required 
            autofocus
          />
        </div>
        
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="form-control" 
            required
          />
        </div>
        
        <button 
          type="submit" 
          class="btn btn-primary btn-block" 
          :disabled="loading"
        >
          <span v-if="loading">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import authService from '../../services/authService';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: ''
    };
  },
  created() {
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    if (authService.isAuthenticated()) {
      this.$router.push({ name: 'admin-events' });
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = '';
      
      try {
        await authService.login(this.username, this.password);
        this.$router.push({ name: 'admin-events' });
      } catch (error) {
        console.error('Login error:', error);
        this.error = 'Identifiants invalides. Veuillez réessayer.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #666;
  font-size: 1rem;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #4a90e2;
  outline: none;
}

.btn {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

.btn-primary:hover {
  background-color: #3a80d2;
}

.btn-block {
  width: 100%;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>

