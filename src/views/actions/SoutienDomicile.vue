<template>
  <div class="service-page">
    <section class="service-hero">
      <div class="service-hero-content">
        <h1 class="service-hero-title animate-fade-in">Soutien à domicile</h1>
        <p class="service-hero-description animate-slide-up delay-1">
          Nous apportons un soutien personnalisé aux personnes âgées à leur domicile, favorisant leur autonomie et bien-être quotidien.
        </p>
      </div>
    </section>

    <section class="service-content section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Notre approche</h2>
        <p class="section-description animate-slide-up delay-1">
          Le service de soutien à domicile de DOUCINE vise à maintenir la qualité de vie et l'autonomie des personnes âgées dans leur environnement familier.
          Nos bénévoles formés offrent une présence régulière et chaleureuse, adaptée aux besoins spécifiques de chaque personne.
        </p>

        <div class="service-features">
          <div class="feature-card animate-card">
            <i class="fas fa-home feature-icon"></i>
            <h3 class="feature-title">Visites régulières</h3>
            <p class="feature-description">
              Des visites planifiées selon les besoins pour assurer une présence régulière et rassurante.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.2s">
            <i class="fas fa-hands-helping feature-icon"></i>
            <h3 class="feature-title">Aide aux tâches quotidiennes</h3>
            <p class="feature-description">
              Assistance pour les courses, la préparation de repas simples ou les démarches administratives.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.4s">
            <i class="fas fa-book-reader feature-icon"></i>
            <h3 class="feature-title">Activités de stimulation</h3>
            <p class="feature-description">
              Lecture, jeux de société, discussions pour maintenir l'activité cognitive et le lien social.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section section animate-section">
      <div class="container">
        <h2 class="cta-title animate-fade-in">Vous souhaitez bénéficier de ce service ?</h2>
        <p class="cta-description animate-slide-up delay-1">
          Contactez-nous pour organiser une première rencontre et évaluer ensemble vos besoins.
        </p>
        <div class="cta-buttons">
          <button class="btn btn-primary animate-pulse delay-2">Nous contacter</button>
          <button class="btn btn-secondary animate-pulse delay-3">En savoir plus</button>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "SoutienDomicile",
  components: {
    TheFooter
  },
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

.feature-icon {
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

.cta-section {
  background-color: #f8f9fa;
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
  
  .service-features {
    grid-template-columns: 1fr;
  }
}
</style> 