<template>
  <div class="home">
    <benefits-section />
  </div>
</template>

<script>
import BenefitsSection from "@/components/BenefitsSection.vue";

export default {
  name: "HomePage",
  components: {
    BenefitsSection,
  },
};
</script>

<style scoped>
.home {
  width: 100%;
}
</style>
