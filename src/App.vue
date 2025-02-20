<template>
  <div id="app">
    <TheNavbar />
    <TheHero />
    <Features />
    <benefits-section />
    <CommunityCTA />
    <TestimonialsSection />
  </div>
</template>

<script>
import TheNavbar from "./components/Navbar.vue";
import TheHero from "./components/TheHero.vue";
import Features from "./components/Features.vue";
import BenefitsSection from "./components/BenefitsSection.vue";
import CommunityCTA from "./components/CommunityCTA.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";


export default {
  name: "App",
  components: {
    TheNavbar,
    TheHero,
    Features,
    BenefitsSection,
    CommunityCTA,
    TestimonialsSection,
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
