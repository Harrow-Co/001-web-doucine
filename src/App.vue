<template>
  <div id="app">
    <TheNavbar />
    <TheHero />
    <Features />
    <benefits-section />
  </div>
</template>

<script>
import TheNavbar from "./components/Navbar.vue";
import TheHero from "./components/TheHero.vue";
import Features from "./components/Features.vue";
import BenefitsSection from "./components/BenefitsSection.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheHero,
    Features,
    BenefitsSection,
  },
};
</script>

<style>
@import "./assets/styles/main.css";

#app {
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
}
</style>
