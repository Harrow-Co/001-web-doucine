<template>
  <div class="service-page">
    <section class="service-hero">
      <div class="service-hero-content">
        <h1 class="service-hero-title animate-fade-in">Ateliers bien-être</h1>
        <p class="service-hero-description animate-slide-up delay-1">
          Des activités pour favoriser le bien-être physique et mental des personnes âgées
        </p>
      </div>
    </section>

    <section class="service-content section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Notre approche holistique</h2>
        <p class="section-description animate-slide-up delay-1">
          Les ateliers bien-être de DOUCINE proposent des activités adaptées aux personnes âgées pour améliorer leur qualité de vie et favoriser leur épanouissement personnel.
        </p>

        <div class="service-features">
          <div class="feature-card animate-card">
            <i class="fas fa-spa feature-icon"></i>
            <h3 class="feature-title">Yoga doux</h3>
            <p class="feature-description">
              Séances de yoga adaptées avec des exercices assis ou debout pour améliorer la souplesse et la mobilité.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.2s">
            <i class="fas fa-brain feature-icon"></i>
            <h3 class="feature-title">Méditation</h3>
            <p class="feature-description">
              Techniques de respiration et de méditation pour réduire le stress et améliorer le bien-être mental.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.4s">
            <i class="fas fa-paint-brush feature-icon"></i>
            <h3 class="feature-title">Art-thérapie</h3>
            <p class="feature-description">
              Ateliers créatifs pour l'expression personnelle et la stimulation cognitive à travers différentes formes d'art.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="benefits-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Les bienfaits</h2>
        <div class="benefits-grid">
          <div class="benefit-item animate-card">
            <i class="fas fa-heart benefit-icon"></i>
            <h3>Santé émotionnelle</h3>
            <p>Réduction du stress et de l'anxiété, amélioration de l'humeur</p>
          </div>
          <div class="benefit-item animate-card" style="--delay: 0.2s">
            <i class="fas fa-walking benefit-icon"></i>
            <h3>Mobilité physique</h3>
            <p>Amélioration de l'équilibre, de la coordination et de la souplesse</p>
          </div>
          <div class="benefit-item animate-card" style="--delay: 0.4s">
            <i class="fas fa-users benefit-icon"></i>
            <h3>Lien social</h3>
            <p>Création de liens à travers des activités collectives enrichissantes</p>
          </div>
          <div class="benefit-item animate-card" style="--delay: 0.6s">
            <i class="fas fa-lightbulb benefit-icon"></i>
            <h3>Stimulation cognitive</h3>
            <p>Maintien des fonctions cognitives et encouragement de la créativité</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section section animate-section">
      <div class="container">
        <h2 class="cta-title animate-fade-in">Participer à nos ateliers</h2>
        <p class="cta-description animate-slide-up delay-1">
          Nos ateliers sont adaptés à tous les niveaux et toutes les capacités. Rejoignez-nous pour prendre soin de votre bien-être !
        </p>
        <div class="cta-buttons">
          <button class="btn btn-primary animate-pulse delay-2">Voir le calendrier</button>
          <button class="btn btn-secondary animate-pulse delay-3">Nous contacter</button>
        </div>
      </div>
    </section>
    
    </div>
</template>

<script>

export default {

  mounted() {
    // Initialize Intersection Observer to trigger animations
    const sections = document.querySelectorAll('.animate-section');
    const cards = document.querySelectorAll('.animate-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    cards.forEach(card => {
      observer.observe(card);
    });
  }
};
</script>

<style scoped>
.service-page {
  width: 100%;
}

.service-hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('@/assets/images/placeholder-bg.jpg');
  background-size: cover;
  background-position: center;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
}

.service-hero-content {
  max-width: 800px;
}

.service-hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.service-hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
}

.service-content {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.section-description {
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.service-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.feature-card.active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon, .benefit-icon {
  font-size: 2.5rem;
  color: #bc0926;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

.benefits-section {
  background-color: #f8f9fa;
  padding: 4rem 2rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.benefit-item {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
}

.benefit-item.active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.benefit-item h3 {
  font-size: 1.3rem;
  margin: 1rem 0;
  color: #333;
}

.benefit-item p {
  color: #666;
  line-height: 1.6;
}

.cta-section {
  padding: 4rem 2rem;
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.cta-description {
  max-width: 600px;
  margin: 0 auto 2rem;
  color: #666;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #bc0926;
  color: white;
}

.btn-primary:hover {
  background-color: #a00820;
}

.btn-secondary {
  background-color: transparent;
  border: 2px solid #bc0926;
  color: #bc0926;
}

.btn-secondary:hover {
  background-color: rgba(188, 9, 38, 0.1);
}

/* Animation classes */
.animate-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-section.active {
  opacity: 1;
  transform: translateY(0);
}

.animate-fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 1s forwards;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

.delay-3 {
  animation-delay: 0.6s;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .service-hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .service-features, .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style> 