<template>
  <section class="community-cta">
    <div class="community-cta__container">
      <div class="community-cta__title">
        Rejoignez notre communauté dynamique
      </div>
      <div class="community-cta__content">
        <p class="community-cta__text">
          Ensemble, nous pouvons créer des liens significatifs et enrichir la
          vie des seniors et des familles. Devenez bénévole et faites une
          différence dans votre communauté.
        </p>
        <div class="community-cta__actions">
          <button class="community-cta__button community-cta__button--primary">
            Postulez
          </button>
          <button
            class="community-cta__button community-cta__button--secondary"
          >
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CommunityCTA",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.community-cta {
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
  justify-content: center;
}

.community-cta__container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 80px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.community-cta__title {
  min-width: 240px;
  font-size: 48px;
  color: #000000;
  font-weight: 700;
  line-height: 58px;
  flex: 1;
  flex-shrink: 1;
}

.community-cta__content {
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: stretch;
  font-weight: 400;
  justify-content: flex-start;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.community-cta__text {
  color: #000000;
  font-size: 18px;
  line-height: 27px;
}

.community-cta__actions {
  align-self: flex-start;
  display: flex;
  margin-top: 32px;
  align-items: flex-start;
  gap: 16px;
  font-size: 16px;
  justify-content: flex-start;
}

.community-cta__button {
  align-self: stretch;
  padding: 12px 24px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  border-color: rgba(0, 0, 0, 1);
}

.community-cta__button--primary {
  background-color: rgba(0, 0, 0, 1);
  color: #ffffff;
  white-space: nowrap;
}

.community-cta__button--secondary {
  background-color: transparent;
  color: #000000;
}

@media (max-width: 991px) {
  .community-cta {
    padding: 100px 20px;
  }

  .community-cta__container {
    max-width: 100%;
    gap: 40px;
  }

  .community-cta__title {
    max-width: 100%;
    font-size: 40px;
    line-height: 54px;
  }

  .community-cta__content {
    max-width: 100%;
  }

  .community-cta__text {
    max-width: 100%;
  }

  .community-cta__button {
    padding-left: 20px;
    padding-right: 20px;
  }

  .community-cta__button--primary {
    white-space: initial;
  }
}
</style>
