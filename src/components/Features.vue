<template>
  <section class="features">
    <div class="features-header">
      <!-- <span class="features-tag">Connexion</span> -->
      <h2 class="features-title">
        Découvrez nos initiatives pour tous les âges
      </h2>
      <p class="features-description">
        Nous croyons fermement que les liens sociaux enrichissent la vie.
        Rejoignez-nous pour créer un environnement où chaque génération peut
        s'épanouir ensemble.
      </p>
    </div>

    <div class="features-grid">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="feature-card"
      >
        <img :src="feature.icon" :alt="feature.title" class="feature-icon" />
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </div>

    <div class="features-actions">
      <button class="btn btn-secondary">Rejoindre</button>
      <div class="link-button">
        <span>En savoir plus</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/9cc59fc65142f42773e3131d8a5a5a8d452f8191d61b72aca044880ddbb310ec"
          alt="Arrow"
          class="link-icon"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TheFeatures",
  data() {
    return {
      features: [
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/766acbcbce9a93a4dfbdc668699203ebbc3c253fe3b3bf3ffdd57997607b4f5f",
          title: "Promouvoir les connexions sociales",
          description:
            "Nous facilitons des rencontres qui renforcent les relations entre les participants.",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fa6119d5f81204fe6d3516d96540d57df07aacd17aae3a163ee6969b8454b114",
          title: "Organiser des événements intergénérationnels",
          description:
            "Nos événements rassemblent les jeunes et les seniors pour partager des expériences.",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/5f9f666004ce497ec7d158ff7000b2ab665a4db3c262ef12313da399d19826b6",
          title: "Favoriser l'engagement communautaire",
          description:
            "Nous encourageons les bénévoles à s'impliquer activement dans notre communauté.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.features {
  background-color: #fff;
  padding: 112px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features-header {
  max-width: 768px;
  text-align: center;
}

.features-tag {
  font-size: 16px;
  font-weight: 600;
}

.features-title {
  font-size: 48px;
  line-height: 58px;
  margin-top: 16px;
}

.features-description {
  font-size: 18px;
  line-height: 27px;
  margin-top: 24px;
}

.features-grid {
  display: flex;
  gap: 48px;
  margin-top: 80px;
  flex-wrap: wrap;
}

.feature-card {
  flex: 1;
  min-width: 240px;
  text-align: center;
}

.feature-icon {
  width: 48px;
  aspect-ratio: 1;
  object-fit: contain;
}

.feature-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
  margin-top: 24px;
}

.feature-description {
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
}

.features-actions {
  display: flex;
  gap: 24px;
  margin-top: 80px;
}

.link-button {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.link-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
}

@media (max-width: 991px) {
  .features {
    padding: 100px 20px;
  }

  .features-title {
    font-size: 40px;
    line-height: 54px;
  }

  .features-grid {
    margin-top: 40px;
  }
}
</style>
