<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  mounted() {
    // Détecter la navigation au clavier pour l'accessibilité
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
      }
    });
    
    // Supprimer la classe lorsque l'utilisateur utilise la souris
    window.addEventListener('mousedown', () => {
      document.body.classList.remove('using-keyboard');
    });
  }
};
</script>

<style>
@import "./assets/styles/main.css";
@import "./assets/styles/animations.css";

#app {
  font-family: Roboto, -apple-system, Roboto, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}

/* Styles pour l'accessibilité */
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

/* Styles de focus invisibles mais accessibles */
:focus {
  outline: none;
}

/* Solution d'accessibilité alternative : afficher le focus uniquement pour la navigation clavier */
body.using-keyboard :focus {
  box-shadow: 0 0 2px 2px rgba(188, 9, 38, 0.3);
}

button:focus, 
a:focus,
input:focus,
textarea:focus,
select:focus {
  outline: none;
  /* Très légère transformation au focus pour feedback visuel subtile */
  transform: scale(1.01);
  transition: transform 0.2s ease;
}

/* Améliorer le contraste pour l'accessibilité */
.high-contrast {
  --primary-color: #bc0926;
  --secondary-color: #333740;
}
</style>
