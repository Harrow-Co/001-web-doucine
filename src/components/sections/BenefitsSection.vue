<template>
  <section class="benefits-section section">
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
            <div class="check-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="list-item-text">
              Renforcez vos liens intergénérationnels avec DOUCINE.
            </div>
          </div>
          <div class="benefits-list-item">
            <div class="check-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="list-item-text">
              Vivez des expériences mémorables avec votre communauté.
            </div>
          </div>
          <div class="benefits-list-item">
            <div class="check-icon-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="list-item-text">
              Participez à des activités enrichissantes et amusantes.
            </div>
          </div>
        </div>
      </div>
      <div class="benefits-image-container">
        <img
          loading="lazy"
          :srcset="imageSrcSet"
          alt="Événements DOUCINE en action"
          class="benefits-image"
        />
        <div class="benefits-image-decoration"></div>
      </div>
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
  background-color: #fff;
  padding: 112px 64px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2A3040;
  justify-content: center;
}

.benefits-container {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 80px;
  justify-content: space-between;
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
  font-size: 38px;
  font-weight: 700;
  line-height: 1.3;
  color: #2A3040;
  position: relative;
  padding-bottom: 20px;
}

.benefits-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #FBB018 0%, #EB1A3A 100%);
  border-radius: 2px;
}

.benefits-description {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  margin-top: 24px;
  color: #4D5259;
}

.benefits-list {
  margin-top: 40px;
  width: 100%;
  padding: 8px 0;
}

.benefits-list-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.check-icon-wrapper {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #5DC8E6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.list-item-text {
  align-self: center;
  color: #2A3040;
  font-size: 16px;
  font-weight: 500;
  flex: 1;
}

.benefits-image-container {
  position: relative;
  align-self: stretch;
  min-width: 240px;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.benefits-image {
  aspect-ratio: 0.96;
  object-fit: cover;
  border-radius: 24px;
  width: 100%;
  position: relative;
  z-index: 2;
  box-shadow: 0 20px 40px rgba(251, 176, 24, 0.15);
}

.benefits-image-decoration {
  position: absolute;
  width: 80%;
  height: 80%;
  background: linear-gradient(135deg, #FBB018 0%, rgba(251, 176, 24, 0.3) 100%);
  opacity: 0.4;
  border-radius: 24px;
  bottom: -20px;
  right: -20px;
  z-index: 1;
}

@media (max-width: 991px) {
  .benefits-section {
    padding: 100px 20px;
  }

  .benefits-container {
    max-width: 100%;
    gap: 60px;
  }

  .benefits-heading {
    font-size: 32px;
  }
  
  .benefits-image-decoration {
    bottom: -10px;
    right: -10px;
  }
}
</style>
