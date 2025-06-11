<template>
  <div class="service-page">
    <section class="service-hero">
      <div class="service-hero-content">
        <h1 class="service-hero-title animate-fade-in">Activités Sociales</h1>
        <p class="service-hero-description animate-slide-up delay-1">
          Nous organisons des activités variées favorisant les rencontres intergénérationnelles et la lutte contre l'isolement social.
        </p>
      </div>
    </section>

    <section class="service-content section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Nos activités communautaires</h2>
        <p class="section-description animate-slide-up delay-1">
          DOUCINE propose des activités sociales régulières qui permettent aux personnes âgées de maintenir des liens sociaux, 
          de partager des moments conviviaux et de s'épanouir grâce à des rencontres intergénérationnelles.
        </p>

        <div class="service-features">
          <div class="feature-card animate-card">
            <i class="fas fa-users feature-icon"></i>
            <h3 class="feature-title">Cafés-rencontres</h3>
            <p class="feature-description">
              Des moments d'échange hebdomadaires dans un cadre chaleureux, favorisant le partage d'expériences.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.2s">
            <i class="fas fa-dice feature-icon"></i>
            <h3 class="feature-title">Ateliers ludiques</h3>
            <p class="feature-description">
              Jeux de société, jeux de mémoire et activités créatives adaptés à tous les âges et toutes les capacités.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.4s">
            <i class="fas fa-music feature-icon"></i>
            <h3 class="feature-title">Événements culturels</h3>
            <p class="feature-description">
              Sorties au théâtre, concerts, expositions et visites culturelles en petits groupes accompagnés.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="calendar-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Calendrier des activités</h2>
        <p class="calendar-description animate-slide-up delay-1">
          Retrouvez notre programme mensuel d'activités et inscrivez-vous à celles qui vous intéressent.
        </p>
        
        <div class="calendar-cta animate-fade-in delay-2">
          <button class="btn btn-primary">Voir le calendrier</button>
          <button class="btn btn-secondary">S'inscrire à la newsletter</button>
        </div>
      </div>
    </section>

    <section class="testimonials-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Témoignages</h2>
        
        <div class="testimonials-grid">
          <div class="testimonial-card animate-card">
            <div class="testimonial-content">
              <p class="testimonial-text">
                "Les cafés-rencontres m'ont permis de sortir de mon isolement et de créer de nouvelles amitiés. Je me sens revivre grâce à ces moments d'échange."
              </p>
            </div>
            <div class="testimonial-author">
              <span class="testimonial-name">Marie, 78 ans</span>
            </div>
          </div>
          
          <div class="testimonial-card animate-card" style="--delay: 0.2s">
            <div class="testimonial-content">
              <p class="testimonial-text">
                "L'ambiance est toujours chaleureuse et bienveillante. J'apprécie particulièrement les activités intergénérationnelles qui me permettent d'échanger avec les plus jeunes."
              </p>
            </div>
            <div class="testimonial-author">
              <span class="testimonial-name">Robert, 82 ans</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  
  </div>
</template>

<script>

export default {
  name: "ActivitesSociales",
  components: {
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

.calendar-section {
  background-color: #f8f9fa;
  padding: 4rem 2rem;
  text-align: center;
}

.calendar-cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.testimonials-section {
  padding: 4rem 2rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
}

.testimonial-card.active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.testimonial-content {
  margin-bottom: 1.5rem;
}

.testimonial-text {
  font-style: italic;
  color: #555;
  line-height: 1.6;
}

.testimonial-author {
  text-align: right;
}

.testimonial-name {
  font-weight: 600;
  color: #333;
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
  
  .service-features, .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
</style> 