<template>
  <section class="benefits-section">
    <div class="benefits-container">
      <div class="benefits-content">
        <div class="benefits-text-content">
          <h2 class="benefits-heading">
            Découvrez les bienfaits des événements DOUCINE pour tous les âges.
          </h2>
          <p class="benefits-description">
            Participer aux événements DOUCINE favorise le bien-être et crée des
            liens durables. Que vous soyez un senior, une famille ou un
            bénévole, chaque activité est une occasion de partager des moments
            enrichissants.
          </p>
        </div>
        <div class="benefits-list">
          <div class="benefits-list-item">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fb13c70beb97a25de79494075a55c55caea66c0339d6de07220a50f623343a84?placeholderIfAbsent=true"
              alt=""
              class="check-icon"
            />
            <div class="list-item-text">
              Renforcez vos liens intergénérationnels avec DOUCINE.
            </div>
          </div>
          <div class="benefits-list-item">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fb13c70beb97a25de79494075a55c55caea66c0339d6de07220a50f623343a84?placeholderIfAbsent=true"
              alt=""
              class="check-icon"
            />
            <div class="list-item-text">
              Vivez des expériences mémorables avec votre communauté.
            </div>
          </div>
          <div class="benefits-list-item">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fb13c70beb97a25de79494075a55c55caea66c0339d6de07220a50f623343a84?placeholderIfAbsent=true"
              alt=""
              class="check-icon"
            />
            <div class="list-item-text">
              Participez à des activités enrichissantes et amusantes.
            </div>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        :srcset="imageSrcSet"
        alt="Événements DOUCINE en action"
        class="benefits-image"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "BenefitsSection",
  computed: {
    imageSrcSet() {
      const baseUrl =
        "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/695e35fe9375ed813e9267c48b6e6e0ed2c5303c0a4eb46842040dcb8370ac1e";
      return [100, 200, 400, 800, 1200, 1600, 2000]
        .map((w) => `${baseUrl}?placeholderIfAbsent=true&width=${w} ${w}w`)
        .join(", ");
    },
  },
};
</script>

<style scoped>
.benefits-section {
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
  color: #000000;
  justify-content: center;
}

.benefits-container {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 80px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.benefits-content {
  align-self: stretch;
  min-width: 240px;
  margin: auto 0;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.benefits-text-content {
  width: 100%;
}

.benefits-heading {
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
}

.benefits-description {
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-top: 24px;
}

.benefits-list {
  margin-top: 32px;
  width: 100%;
  padding: 8px 0;
  font-size: 16px;
  font-weight: 400;
}

.benefits-list-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.benefits-list-item:not(:first-child) {
  margin-top: 16px;
}

.check-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 16px;
  align-self: stretch;
  margin: auto 0;
  flex-shrink: 0;
}

.list-item-text {
  align-self: stretch;
  margin: auto 0;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.benefits-image {
  aspect-ratio: 0.96;
  object-fit: contain;
  object-position: center;
  width: 100%;
  align-self: stretch;
  min-width: 240px;
  margin: auto 0;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

@media (max-width: 991px) {
  .benefits-section {
    padding: 100px 20px;
  }

  .benefits-container {
    max-width: 100%;
    gap: 40px;
  }

  .benefits-content,
  .benefits-text-content,
  .benefits-heading,
  .benefits-description,
  .benefits-list,
  .benefits-list-item,
  .list-item-text,
  .benefits-image {
    max-width: 100%;
  }
}
</style>
