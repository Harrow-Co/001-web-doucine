<template>
  <div class="not-found">
    <div class="not-found-container">
      <img src="@/assets/logo_doucine.png" alt="Logo Doucine" class="logo">
      <h1>404</h1>
      <div class="separator"></div>
      <h2>Page non trouvée</h2>
      <p>Nous sommes désolés, la page que vous recherchez n'existe pas ou a été déplacée.</p>
      <router-link to="/" class="btn-home">Retour à l'accueil</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
  metaInfo: {
    title: "Page non trouvée | Doucine"
  }
};
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  text-align: center;
  padding: 2rem;
  margin-top: 60px;
  background-color: #faf9f7;
}

.not-found-container {
  max-width: 600px;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.logo {
  max-width: 180px;
  margin-bottom: 2rem;
}

.separator {
  width: 80px;
  height: 3px;
  background-color: #d5a770;
  margin: 1rem auto 2rem;
}

h1 {
  font-size: 8rem;
  margin: 0;
  color: #d5a770;
  line-height: 1;
  font-weight: 300;
}

h2 {
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-weight: 500;
}

p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

.btn-home {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #d5a770;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  border: 2px solid #d5a770;
}

.btn-home:hover {
  background-color: transparent;
  color: #d5a770;
}

@media (max-width: 767px) {
  h1 {
    font-size: 6rem;
  }
  
  .not-found-container {
    padding: 2rem;
  }
  
  .logo {
    max-width: 140px;
  }
}
</style> 