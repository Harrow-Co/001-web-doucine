<template>
  <div class="home">
    <TheHero />
    <Features />
    <benefits-section />
    <community-c-t-a />
    <TestimonialsSection />
    <TeamSection />
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
};
</script>
