<template>
  <div class="home">
    <TheHero />
    <Features class="animate-section" @open-registration-modal="$emit('open-registration-modal')" />
    <benefits-section class="animate-section" />
    <!-- <community-c-t-a class="animate-section" /> -->
    <TestimonialsSection class="animate-section" />
    <TeamSection class="animate-section" />
  </div>
</template>

<script>
import TheHero from "@/components/sections/TheHero.vue";
import Features from "@/components/sections/Features.vue";
import BenefitsSection from "@/components/sections/BenefitsSection.vue";
// import CommunityCTA from "@/components/sections/CommunityCTA.vue";
import TestimonialsSection from "@/components/sections/TestimonialsSection.vue";
import TeamSection from "@/components/sections/TeamSection.vue";

export default {
  name: "HomePage",
  components: {
    TheHero,
    Features,
    BenefitsSection,
    // CommunityCTA, 
    TestimonialsSection,
    TeamSection,
  },
  emits: ['open-registration-modal'],
  mounted() {
    // Initialize Intersection Observer to trigger animations
    const sections = document.querySelectorAll('.animate-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
};
</script>
