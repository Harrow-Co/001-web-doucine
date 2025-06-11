<template>
  <div class="apropos-page">
    <HowItWorks />
  </div>
</template>

<script>
import HowItWorks from "@/components/sections/HowItWorks.vue";

export default {
  name: "AproposPage",
  components: {
    HowItWorks,
  },
};
</script>

<style scoped>
.apropos-page {
  padding-top: 80px;
  min-height: 100vh;
  background-color: #FAFAFA;
}

@media (max-width: 991px) {
  .apropos-page {
    padding-top: 60px;
  }
}
</style>

