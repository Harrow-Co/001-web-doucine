<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Vivre ensemble pour bien vieillir</h1>
      <p class="hero-description">
        Bienvenue chez DOUCINE, où chaque événement crée des liens précieux
        entre les générations. Rejoignez-nous pour célébrer la vie et renforcer
        notre communauté.
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary">Participer</button>
        <button class="btn btn-secondary">En savoir plus</button>
      </div>
    </div>
    <img
      class="hero-image"
      src="https://cdn.pixabay.com/photo/2022/06/12/02/11/family-7257182_1280.jpg"
      alt="Hero"
    />
  </section>
</template>

<script>
export default {
  name: "TheHero",
};
</script>

<style scoped>
.hero {
  background-color: #fff;
  padding: 112px 64px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.hero-content {
  align-self: center;
  max-width: 768px;
  text-align: center;
}

.hero-title {
  font-size: 55px;
  font-weight: 700;
  line-height: 67px;
  margin-top: 50px;
}

.hero-description {
  font-size: 18px;
  line-height: 27px;
  margin-top: 24px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

.hero-image {
  width: 100%;
  /* aspect-ratio: 1.78; */
  object-fit: contain;
  margin-top: 80px;
  border-radius: 50px;
}

@media (max-width: 991px) {
  .hero {
    padding: 100px 20px;
  }

  .hero-title {
    font-size: 40px;
    line-height: 54px;
  }

  .hero-image {
    margin-top: 40px;
  }
}
</style>
