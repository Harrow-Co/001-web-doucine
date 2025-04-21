<template>
  <div class="service-page">
    <section class="service-hero">
      <div class="service-hero-content">
        <h1 class="service-hero-title animate-fade-in">Soutien Administratif</h1>
        <p class="service-hero-description animate-slide-up delay-1">
          Accompagnement personnalisé pour les démarches administratives et l'accès aux droits des personnes âgées
        </p>
      </div>
    </section>

    <section class="service-content section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Notre aide administrative</h2>
        <p class="section-description animate-slide-up delay-1">
          DOUCINE propose un accompagnement complet pour aider les personnes âgées à comprendre et effectuer leurs démarches administratives, souvent complexes et dématérialisées.
        </p>

        <div class="service-features">
          <div class="feature-card animate-card">
            <i class="fas fa-file-alt feature-icon"></i>
            <h3 class="feature-title">Formalités administratives</h3>
            <p class="feature-description">
              Aide pour remplir des formulaires, rédiger des courriers et constituer des dossiers administratifs.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.2s">
            <i class="fas fa-laptop feature-icon"></i>
            <h3 class="feature-title">Démarches en ligne</h3>
            <p class="feature-description">
              Assistance pour réaliser des démarches sur internet, créer des comptes en ligne et utiliser les services numériques.
            </p>
          </div>
          
          <div class="feature-card animate-card" style="--delay: 0.4s">
            <i class="fas fa-handshake feature-icon"></i>
            <h3 class="feature-title">Accès aux droits</h3>
            <p class="feature-description">
              Information et accompagnement pour l'accès aux aides sociales, allocations et dispositifs de soutien disponibles.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="process-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Notre démarche</h2>
        
        <div class="process-steps">
          <div class="process-step animate-card">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Évaluation des besoins</h3>
              <p>Entretien personnalisé pour comprendre vos besoins et identifier les démarches prioritaires</p>
            </div>
          </div>
          
          <div class="process-step animate-card" style="--delay: 0.2s">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Plan d'accompagnement</h3>
              <p>Élaboration d'un plan d'action adapté à votre situation et à vos priorités</p>
            </div>
          </div>
          
          <div class="process-step animate-card" style="--delay: 0.4s">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Réalisation des démarches</h3>
              <p>Accompagnement pour réaliser les démarches identifiées, étape par étape</p>
            </div>
          </div>
          
          <div class="process-step animate-card" style="--delay: 0.6s">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Suivi et autonomisation</h3>
              <p>Suivi régulier et transmission de compétences pour favoriser l'autonomie</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="faq-section section animate-section">
      <div class="container">
        <h2 class="section-title animate-fade-in">Questions fréquentes</h2>
        
        <div class="faq-items">
          <div class="faq-item animate-card">
            <h3 class="faq-question">Quelles sont les démarches pour lesquelles vous pouvez m'aider ?</h3>
            <p class="faq-answer">
              Nos bénévoles peuvent vous accompagner pour toutes les démarches administratives courantes : impôts, retraite, santé, aides sociales, logement, etc.
            </p>
          </div>
          
          <div class="faq-item animate-card" style="--delay: 0.2s">
            <h3 class="faq-question">Comment garantissez-vous la confidentialité de mes informations ?</h3>
            <p class="faq-answer">
              Tous nos bénévoles sont formés et tenus à une stricte confidentialité. Nous ne conservons aucun document personnel sans votre autorisation expresse.
            </p>
          </div>
          
          <div class="faq-item animate-card" style="--delay: 0.4s">
            <h3 class="faq-question">Ce service est-il gratuit ?</h3>
            <p class="faq-answer">
              Oui, notre service de soutien administratif est entièrement gratuit pour les personnes âgées, dans la limite des capacités de notre équipe de bénévoles.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section section animate-section">
      <div class="container">
        <h2 class="cta-title animate-fade-in">Besoin d'aide administrative ?</h2>
        <p class="cta-description animate-slide-up delay-1">
          N'hésitez pas à nous contacter pour prendre rendez-vous avec un de nos bénévoles.
        </p>
        <div class="cta-buttons">
          <button class="btn btn-primary animate-pulse delay-2">Prendre rendez-vous</button>
          <button class="btn btn-secondary animate-pulse delay-3">Nous contacter</button>
        </div>
      </div>
    </section>
    
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "SoutienAdministratif",
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

.process-section {
  background-color: #f8f9fa;
  padding: 4rem 2rem;
}

.process-steps {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-step {
  display: flex;
  align-items: flex-start;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
}

.process-step.active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #bc0926;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.step-content p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.faq-section {
  padding: 4rem 2rem;
}

.faq-items {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
}

.faq-item.active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}

.faq-question {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.75rem;
}

.faq-answer {
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
  
  .step-number {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
}
</style> 