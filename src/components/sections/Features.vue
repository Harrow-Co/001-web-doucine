<template>
  <section class="features section">
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
        <div class="feature-icon-wrapper" :class="`feature-icon-wrapper-${index + 1}`">
          <img :src="feature.icon" :alt="feature.title" class="feature-icon" />
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </div>

    <div class="features-actions">
      <button class="btn btn-primary">Rejoindre</button>
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
  font-size: 42px;
  line-height: 1.3;
  margin-top: 16px;
  color: #2A3040;
  position: relative;
  display: inline-block;
  padding-bottom: 20px;
}

.features-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  border-radius: 2px;
}

.features-description {
  font-size: 18px;
  line-height: 1.7;
  margin-top: 24px;
  color: #4D5259;
}

.features-grid {
  display: flex;
  gap: 32px;
  margin-top: 80px;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-card {
  flex: 1;
  min-width: 280px;
  max-width: 350px;
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  transition: all 0.3s ease;
  background-color: #FAFAFA;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.1);
}

.feature-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.feature-icon-wrapper-1 {
  background: #EB1A3A;
}

.feature-icon-wrapper-2 {
  background: #FBB018;
}

.feature-icon-wrapper-3 {
  background: #5DC8E6;
}

.feature-icon {
  width: 40px;
  aspect-ratio: 1;
  object-fit: contain;
  filter: invert(1) brightness(2);
}

.feature-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 16px;
  color: #2A3040;
}

.feature-description {
  font-size: 16px;
  line-height: 1.6;
  margin-top: 16px;
  color: #4D5259;
}

.features-actions {
  display: flex;
  gap: 24px;
  margin-top: 80px;
  align-items: center;
}

.link-button {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #5DC8E6;
  font-weight: 600;
  transition: all 0.3s ease;
}

.link-button:hover {
  transform: translateX(4px);
}

.link-icon {
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
  filter: invert(69%) sepia(61%) saturate(490%) hue-rotate(164deg) brightness(94%) contrast(87%);
}

@media (max-width: 991px) {
  .features {
    padding: 100px 20px;
  }

  .features-title {
    font-size: 36px;
    line-height: 1.3;
  }

  .features-grid {
    margin-top: 40px;
    gap: 24px;
  }
  
  .feature-card {
    padding: 30px 20px;
  }
}
</style>
