<template>
  <div class="home">
    <TheHero />
    <Features class="animate-section" />
    <benefits-section class="animate-section" />
    <community-c-t-a class="animate-section" />
    <TestimonialsSection class="animate-section" />
    <TeamSection class="animate-section" />
    <TheFooter />
  </div>
</template>

<script>
import TheHero from "@/components/TheHero.vue";
import Features from "@/components/Features.vue";
import BenefitsSection from "@/components/BenefitsSection.vue";
import CommunityCTA from "@/components/CommunityCTA.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import TeamSection from "@/components/TeamSection.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "HomePage",
  components: {
    TheHero,
    Features,
    BenefitsSection,
    CommunityCTA, 
    TestimonialsSection,
    TeamSection,
    TheFooter,
  },
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
