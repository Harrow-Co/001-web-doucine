<template>
  <section class="mission-section">
    <div class="mission-content">
      <div class="mission-title">Notre Mission</div>
      <div class="mission-description">
        DOUCINE s'engage à renforcer les liens sociaux et à promouvoir le
        bien-être des seniors et des familles. À travers des événements
        intergénérationnels, nous cultivons une communauté dynamique et
        solidaire.
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MissionSection",
};
</script>

<style scoped>
.mission-section {
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 112px 64px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  color: #000;
  justify-content: center;
}

.mission-content {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 80px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mission-title {
  min-width: 240px;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.mission-description {
  min-width: 240px;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

@media (max-width: 991px) {
  .mission-section {
    padding: 100px 20px;
  }

  .mission-content {
    max-width: 100%;
    gap: 40px;
  }

  .mission-title {
    max-width: 100%;
    font-size: 40px;
  }

  .mission-description {
    max-width: 100%;
  }
}
</style>
