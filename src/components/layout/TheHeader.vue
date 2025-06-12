<template>
  <header class="header">
    <div class="header__column">
      <div class="header__content">
        <h1 class="header__title">
          Unissons nos forces pour un avenir meilleur
        </h1>
        <p class="header__description">
          Bienvenue chez DOUCINE, où chaque événement crée des liens précieux
          entre les générations. Rejoignez-nous pour célébrer la vie et
          renforcer notre communauté.
        </p>
      </div>
      <div class="header__actions">
        <button class="header__button header__button--primary">
          Participer
        </button>
        <button class="header__button header__button--secondary">
          En savoir plus
        </button>
      </div>
    </div>
    <img
      loading="lazy"
      :srcset="imageSrcSet"
      class="header__image"
      alt="Header illustration"
    />
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    imageSrcSet() {
      return "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/d7fa4f3a68eaeba4ad6b5be86a3cf4a38e7b197b88567b2671cdf56d7de036e4?placeholderIfAbsent=true";
    },
  },
};
</script>

<style scoped>
.header {
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
  justify-content: flex-start;
}

.header__column {
  align-self: center;
  display: flex;
  width: 768px;
  max-width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.header__content {
  width: 100%;
  color: #000000;
  text-align: center;
}

.header__title {
  font-size: 56px;
  font-weight: 700;
  line-height: 67px;
}

.header__description {
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-top: 24px;
}

.header__actions {
  align-self: center;
  display: flex;
  margin-top: 32px;
  align-items: flex-start;
  gap: 16px;
  font-size: 16px;
  font-weight: 400;
  justify-content: flex-start;
}

.header__button {
  align-self: stretch;
  padding: 12px 24px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 1);
}

.header__button--primary {
  background-color: rgba(0, 0, 0, 1);
  color: #010101;
  white-space: nowrap;
}

.header__button--secondary {
  color: #000000;
}

.header__image {
  aspect-ratio: 1.78;
  object-fit: contain;
  object-position: center;
  width: 100%;
  margin-top: 80px;
}

@media (max-width: 991px) {
  .header {
    padding: 100px 20px;
  }

  .header__content {
    max-width: 100%;
  }

  .header__title {
    max-width: 100%;
    font-size: 40px;
    line-height: 54px;
  }

  .header__description {
    max-width: 100%;
  }

  .header__button {
    padding-left: 20px;
    padding-right: 20px;
  }

  .header__button--primary {
    white-space: initial;
  }

  .header__image {
    max-width: 100%;
    margin-top: 40px;
  }
}
</style>
