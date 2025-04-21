<template>
  <div class="service-page">
    <section class="service-hero">
      <div class="service-hero-content">
        <h1 class="service-hero-title animate-fade-in">Prévention Santé</h1>
        <p class="service-hero-description animate-slide-up delay-1">
          Actions de sensibilisation et de prévention pour améliorer le bien-être et la santé des personnes âgées
        </p>
      </div>
    </section>

    <section class="service-content section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Notre approche préventive</h2>
        <p class="section-description animate-slide-up delay-1">
          La prévention est essentielle pour bien vieillir. DOUCINE propose des actions de sensibilisation et des ateliers pratiques pour aider les personnes âgées à maintenir leur autonomie et leur santé le plus longtemps possible.
        </p>

        <div class="service-features">
          <div class="feature-card animate-card">
            <i class="fas fa-heartbeat feature-icon"></i>
            <h3 class="feature-title">Ateliers santé</h3>
            <p class="feature-description">
              Sessions d'information et de sensibilisation sur différentes thématiques de santé animées par des professionnels.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.2s">
            <i class="fas fa-apple-alt feature-icon"></i>
            <h3 class="feature-title">Nutrition adaptée</h3>
            <p class="feature-description">
              Conseils nutritionnels et ateliers cuisine pour une alimentation équilibrée adaptée aux besoins des seniors.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.4s">
            <i class="fas fa-dumbbell feature-icon"></i>
            <h3 class="feature-title">Activité physique douce</h3>
            <p class="feature-description">
              Séances d'exercices adaptés pour maintenir la mobilité et prévenir les chutes et les problèmes articulaires.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="themes-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Thématiques abordées</h2>
        <div class="themes-grid">
          <div class="theme-item animate-card">
            <div class="theme-icon-container">
              <i class="fas fa-brain theme-icon"></i>
            </div>
            <h3>Mémoire et cognition</h3>
            <p>Exercices et techniques pour maintenir et stimuler les fonctions cognitives</p>
          </div>
          <div class="theme-item animate-card" style="--delay: 0.2s">
            <div class="theme-icon-container">
              <i class="fas fa-bed theme-icon"></i>
            </div>
            <h3>Sommeil et récupération</h3>
            <p>Conseils pour améliorer la qualité du sommeil et adopter une bonne hygiène de vie</p>
          </div>
          <div class="theme-item animate-card" style="--delay: 0.4s">
            <div class="theme-icon-container">
              <i class="fas fa-pills theme-icon"></i>
            </div>
            <h3>Suivi des traitements</h3>
            <p>Aide à la compréhension et à l'observance des traitements médicaux</p>
          </div>
          <div class="theme-item animate-card" style="--delay: 0.6s">
            <div class="theme-icon-container">
              <i class="fas fa-home theme-icon"></i>
            </div>
            <h3>Sécurité du domicile</h3>
            <p>Conseils pour aménager son intérieur et prévenir les accidents domestiques</p>
          </div>
        </div>
      </div>
    </section>

    <section class="calendar-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Nos prochains ateliers</h2>
        <p class="calendar-description animate-slide-up delay-1">
          Consultez notre calendrier d'ateliers et inscrivez-vous gratuitement aux sessions qui vous intéressent.
        </p>
        
        <div class="calendar-cta animate-fade-in delay-2">
          <button class="btn btn-primary">Consulter le calendrier</button>
          <button class="btn btn-secondary">Nous contacter</button>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "PreventionSante",
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

.section-description, .calendar-description {
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

.feature-icon, .theme-icon {
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

.themes-section {
  background-color: #f8f9fa;
  padding: 4rem 2rem;
}

.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.theme-item {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
}

.theme-item.active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.theme-icon-container {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background-color: rgba(188, 9, 38, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.theme-item p {
  color: #666;
  line-height: 1.6;
}

.calendar-section {
  padding: 4rem 2rem;
  text-align: center;
}

.calendar-cta {
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

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
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

@media (max-width: 768px) {
  .service-hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .service-features, .themes-grid {
    grid-template-columns: 1fr;
  }
}
</style> 