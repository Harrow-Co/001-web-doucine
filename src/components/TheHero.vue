<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <img
        class="navbar-logo animate-fade-in"
        src="@/assets/logo_doucine.png"
        alt="Logo"
      />
      <h1 class="hero-title animate-slide-up">Vivre ensemble pour bien vieillir</h1>
      <p class="hero-description animate-slide-up delay-2">
        Bienvenue chez DOUCINE, où chaque événement crée des liens précieux
        entre les générations. Rejoignez-nous pour célébrer la vie et renforcer
        notre communauté.
      </p>
      <div class="hero-actions animate-fade-in delay-4">
        <button class="btn btn-primary">Participer</button>
        <button class="btn btn-secondary">En savoir plus</button>
      </div>
    </div>
    <img
      class="hero-image animate-zoom delay-3"
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
.navbar-logo {
  width: 200px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.navbar-logo:hover {
  transform: scale(1.05);
}

.hero {
  background: linear-gradient(135deg, #fff 0%, #f5f7fa 100%);
  padding: 112px 64px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 0 0 40px 40px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(93, 200, 230, 0.05) 0%,
    rgba(93, 200, 230, 0.15) 100%
  );
  border-radius: 0 0 0 100%;
  z-index: 0;
}

.hero-content {
  align-self: center;
  max-width: 768px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.2;
  margin-top: 40px;
  background: linear-gradient(90deg, #eb1a3a 0%, #fbb018 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.5px;
}

.hero-description {
  font-size: 18px;
  line-height: 1.7;
  margin-top: 24px;
  color: #4d5259;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 40px;
}

.hero-image {
  width: 85%;
  max-width: 1100px;
  margin: 80px auto 0;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(93, 200, 230, 0.2);
  object-fit: cover;
  aspect-ratio: 16/9;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
}

.hero-image:hover {
  transform: translateY(-10px);
}

@media (max-width: 991px) {
  .hero {
    padding: 100px 20px;
    border-radius: 0 0 30px 30px;
  }

  .hero-title {
    font-size: 42px;
    line-height: 1.2;
  }

  .hero-image {
    width: 100%;
    margin-top: 50px;
  }
}
</style>
