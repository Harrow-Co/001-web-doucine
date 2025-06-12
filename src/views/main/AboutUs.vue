<template>
  <div class="about-us-page">
    <HowItWorksSection />
  </div>
</template>

<script>
import HowItWorksSection from "@/components/sections/HowItWorksSection.vue";

export default {
  name: "AboutUs",
  components: {
    HowItWorksSection,
  },
};
</script>

<style scoped>
.about-us-page {
  width: 100%;
}
</style>
