<template>
  <section class="about-section">
    <!-- Hero Banner -->
    <div class="about-hero">
      <div class="about-hero-content">
        <h1 class="about-title animate-fade-in">Vivre ensemble pour bien vieillir</h1>
        <p class="about-subtitle animate-slide-up">
          Une équipe engagée et dynamique pour nos aînés
        </p>
      </div>
    </div>

    <!-- Mission Section -->
    <div class="mission-section section animate-section">
      <div class="section-container">
        <div class="mission-content animate-slide-right">
          <h2 class="section-title">Notre Mission</h2>
          <div class="mission-text">
            <p>
              DOUCINE tend à établir un lien social et de bien-être auprès des jeunes retraités.
            </p>
            <p>
              Elle contribue à être un outil d'accès au bien vieillir et au bien vivre ensemble 
              pour les personnes âgées et les familles.
            </p>
            <p>
              Elle met l'accent sur la prévention de la perte d'autonomie et l'accompagnement 
              de la santé ainsi que la qualité de vie des seniors à leur domicile.
            </p>
            <p>
              Aide à transmettre les valeurs et à renforcer la cohésion sociale entre les générations.
              Elle tend à favoriser la solidarité, l'entraide, le respect, la citoyenneté, le 
              partage, l'échange et à rompre l'isolement des aînés.
            </p>
            <p>
              Favorise le maintien du lien familial.
            </p>
          </div>
        </div>
        <div class="mission-visual animate-slide-left">
          <div class="mission-graphic">
            <img src="@/assets/logo_doucine.png" alt="Logo DOUCINE" class="mission-logo animate-pulse" />
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="services-section section animate-section">
      <h2 class="section-title centered animate-fade-in">Nos actions à domicile et au local</h2>
      
      <div class="services-grid">
        <div class="service-card animate-card" style="--delay: 0.1s">
          <div class="service-number">1</div>
          <h3 class="service-title">Activités et accompagnement</h3>
          <p class="service-description">
            Activités sociales, culturelles, ludiques et numériques. Des séances de 2 heures dédiées 
            à la convivialité pour briser l'isolement.
          </p>
          <div class="service-icon">
            <i class="fas fa-users service-fa-icon"></i>
          </div>
        </div>
        
        <div class="service-card animate-card" style="--delay: 0.2s">
          <div class="service-number">2</div>
          <h3 class="service-title">Activité de sensibilité</h3>
          <p class="service-description">
            Faire de la prévention sur la santé de nos GANGAN'S
          </p>
          <div class="service-icon">
            <i class="fas fa-heartbeat service-fa-icon"></i>
          </div>
        </div>
        
        <div class="service-card animate-card" style="--delay: 0.3s">
          <div class="service-number">3</div>
          <h3 class="service-title">Accompagnement administratif</h3>
          <p class="service-description">
            Connaître leurs droits, les aides existantes selon leurs situations.
            Rédaction de courrier administratif.
          </p>
          <div class="service-icon">
            <i class="fas fa-file-alt service-fa-icon"></i>
          </div>
        </div>
        
        <div class="service-card animate-card" style="--delay: 0.4s">
          <div class="service-number">4</div>
          <h3 class="service-title">Activités de bien-être</h3>
          <p class="service-description">
            Sports et loisirs. Ateliers de confiance en soi et exercices visant à expérimenter 
            différentes étapes de tonicité du corps.
          </p>
          <div class="service-icon">
            <i class="fas fa-spa service-fa-icon"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Values Section -->
    <div class="values-section section animate-section">
      <div class="section-container reverse">
        <div class="values-content animate-slide-left">
          <h2 class="section-title">Nos valeurs</h2>
          <div class="values-grid">
            <div class="value-item animate-value" style="--delay: 0.1s">
              <div class="value-dot red"></div>
              <h3>Bien-être</h3>
              <p>Prendre soin de la santé physique et mentale de nos aînés</p>
            </div>
            
            <div class="value-item animate-value" style="--delay: 0.2s">
              <div class="value-dot blue"></div>
              <h3>Bien vivre</h3>
              <p>Favoriser l'autonomie et la qualité de vie au quotidien</p>
            </div>
            
            <div class="value-item animate-value" style="--delay: 0.3s">
              <div class="value-dot yellow"></div>
              <h3>Prévention</h3>
              <p>Anticiper et prévenir les problèmes de santé et d'autonomie</p>
            </div>
            
            <div class="value-item animate-value" style="--delay: 0.4s">
              <div class="value-dot teal"></div>
              <h3>Partage</h3>
              <p>Créer des liens intergénérationnels et favoriser l'échange</p>
            </div>
          </div>
        </div>
        
        <div class="values-visual animate-slide-right">
          <div class="values-graphic">
            <div class="values-circles">
              <div class="circle-lg red-gradient"></div>
              <div class="circle-md blue-gradient"></div>
              <div class="circle-sm yellow-gradient"></div>
              <div class="circle-xs teal-gradient"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="team-section section animate-section">
      <h2 class="section-title centered animate-fade-in">Notre équipe</h2>
      <p class="team-intro animate-slide-up">
        Nous sommes une équipe engagée et dynamique pour nos aînés,
        passionnée par le bien-être des personnes âgées et déterminée à créer des
        liens intergénérationnels forts.
      </p>
      
      <div class="team-visual animate-fade-in" style="--delay: 0.3s">
        <div class="team-graphic">
          <div class="team-silhouettes">
            <i class="fas fa-user-friends team-icon animate-bounce"></i>
            <h3 class="team-caption">Une équipe engagée et dynamique pour nos aînés</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Section
    <div class="contact-section section animate-section">
      <div class="contact-container">
        <h2 class="section-title animate-fade-in">Contactez-nous</h2>
        <div class="contact-info animate-slide-up">
          <div class="contact-item">
            <i class="fas fa-phone-alt contact-icon animate-wiggle"></i>
            <p>0694 20 52 31</p>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope contact-icon animate-wiggle"></i>
            <p>doucine97351@gmail.com</p>
          </div>
        </div>
        
        <button class="btn btn-primary contact-btn animate-pulse">Nous contacter</button>
      </div>
    </div> -->
  </section>
</template>

<script>
export default {
  name: "HowItWorks",
  mounted() {
    // Initialize Intersection Observer to trigger animations when sections come into view
    const sections = document.querySelectorAll('.animate-section');
    
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
  }
};
</script>

<style scoped>
.about-section {
  width: 100%;
}

.about-hero {
  background: linear-gradient(135deg, #FBB018 0%, #EB1A3A 100%);
  padding: 120px 40px;
  text-align: center;
  color: white;
  border-radius: 0 0 40px 40px;
  margin-bottom: 40px;
}

.about-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
}

.about-title::after {
  content: '';
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: white;
  border-radius: 2px;
}

.about-subtitle {
  font-size: 24px;
  margin-top: 30px;
  font-weight: 500;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.section {
  padding: 80px 40px;
  margin-bottom: 40px;
  background-color: white;
  border-radius: 20px;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.section-container {
  display: flex;
  gap: 60px;
  align-items: center;
}

.reverse {
  flex-direction: row-reverse;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #2A3040;
  position: relative;
  display: inline-block;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  border-radius: 2px;
}

.centered {
  text-align: center;
  display: block;
}

.centered::after {
  left: 50%;
  transform: translateX(-50%);
}

/* Mission Section */
.mission-content, .values-content {
  flex: 1;
}

.mission-visual, .values-visual, .team-visual {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mission-graphic {
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.graphic-circle {
  position: absolute;
  border-radius: 50%;
}

.graphic-circle.red {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #EB1A3A 0%, rgba(235, 26, 58, 0.7) 100%);
  animation: pulse 4s infinite alternate;
}

.graphic-circle.yellow {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #FBB018 0%, rgba(251, 176, 24, 0.7) 100%);
  animation: pulse 4s infinite alternate-reverse;
}

.graphic-text {
  position: relative;
  z-index: 5;
  text-align: center;
  color: white;
  font-weight: 800;
  display: flex;
  flex-direction: column;
}

.graphic-text span {
  font-size: 24px;
  line-height: 1.2;
}

.accent-text {
  font-size: 32px !important;
}

.mission-text p {
  margin-bottom: 15px;
  line-height: 1.7;
  color: #4D5259;
}

/* Services Section */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.service-card {
  background-color: #FAFAFA;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.service-number {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #EB1A3A 0%, #FBB018 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.service-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 15px;
  color: #2A3040;
  padding-right: 50px;
}

.service-description {
  color: #4D5259;
  line-height: 1.6;
  margin-bottom: 20px;
}

.service-icon {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.service-icon img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.service-fa-icon {
  font-size: 48px;
  color: #EB1A3A;
  opacity: 0.8;
  transition: transform 0.3s ease, color 0.3s ease;
}

.service-card:hover .service-fa-icon {
  transform: scale(1.1);
  color: #FBB018;
}

/* Values Section */
.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.value-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.value-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.red {
  background-color: #EB1A3A;
}

.blue {
  background-color: #5DC8E6;
}

.yellow {
  background-color: #FBB018;
}

.teal {
  background-color: #40E0D0;
}

.value-item h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #2A3040;
}

.value-item p {
  color: #4D5259;
  line-height: 1.6;
}

/* Team Section */
.team-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  color: #4D5259;
  line-height: 1.7;
  font-size: 18px;
}

.team-visual {
  padding: 60px;
  text-align: center;
}

.team-graphic {
  padding: 60px;
  text-align: center;
}

.team-silhouettes {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.team-icon {
  font-size: 100px;
  color: #EB1A3A;
  opacity: 0.8;
}

.team-caption {
  font-size: 20px;
  font-weight: 600;
  color: #4D5259;
  max-width: 350px;
}

/* Contact Section */
.contact-section {
  background: linear-gradient(135deg, #5DC8E6 0%, #40E0D0 100%);
  color: white;
}

.contact-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-section .section-title {
  color: white;
}

.contact-section .section-title::after {
  background: white;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.contact-icon {
  font-size: 24px;
}

.contact-btn {
  background-color: white;
  color: #5DC8E6;
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 18px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.contact-btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 991px) {
  .about-hero {
    padding: 80px 20px;
  }
  
  .about-title {
    font-size: 36px;
  }
  
  .about-subtitle {
    font-size: 20px;
  }
  
  .section {
    padding: 60px 20px;
  }
  
  .section-container {
    flex-direction: column;
    gap: 40px;
  }
  
  .reverse {
    flex-direction: column;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
}

.logo-image {
  background-color: white;
  padding: 30px;
  border-radius: 50%;
  max-width: 300px;
  object-fit: contain;
}

/* Animations */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(-10px) translateX(5px);
  }
}

/* Values Visual */
.values-graphic {
  position: relative;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.values-circles {
  position: relative;
  width: 100%;
  height: 100%;
}

.circle-lg, .circle-md, .circle-sm, .circle-xs {
  position: absolute;
  border-radius: 50%;
}

.circle-lg {
  width: 200px;
  height: 200px;
  top: 20px;
  left: 20px;
}

.circle-md {
  width: 150px;
  height: 150px;
  bottom: 40px;
  right: 40px;
}

.circle-sm {
  width: 100px;
  height: 100px;
  top: 50px;
  right: 70px;
}

.circle-xs {
  width: 70px;
  height: 70px;
  bottom: 70px;
  left: 70px;
}

.red-gradient {
  background: linear-gradient(135deg, #EB1A3A 0%, rgba(235, 26, 58, 0.7) 100%);
  animation: float 6s infinite alternate;
}

.blue-gradient {
  background: linear-gradient(135deg, #5DC8E6 0%, rgba(93, 200, 230, 0.7) 100%);
  animation: float 8s infinite alternate-reverse;
}

.yellow-gradient {
  background: linear-gradient(135deg, #FBB018 0%, rgba(251, 176, 24, 0.7) 100%);
  animation: float 5s infinite alternate;
}

.teal-gradient {
  background: linear-gradient(135deg, #40E0D0 0%, rgba(64, 224, 208, 0.7) 100%);
  animation: float 7s infinite alternate-reverse;
}

.mission-logo {
  position: relative;
  z-index: 10;
  width: 380px;
  height: 380px;
  background-color: white;
  padding: 20px;
  border-radius: 10%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Animation Classes */
.animate-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-section.active {
  opacity: 1;
  transform: translateY(0);
}

.animate-fade-in {
  animation: fadeIn 1s ease forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease forwards;
}

.animate-slide-right {
  animation: slideRight 1s ease forwards;
}

.animate-slide-left {
  animation: slideLeft 1s ease forwards;
}

.animate-card {
  opacity: 0;
  transform: translateY(30px);
  animation: cardAppear 0.5s ease forwards;
  animation-delay: var(--delay, 0s);
}

.animate-value {
  opacity: 0;
  transform: translateX(-20px);
  animation: fadeSlideIn 0.5s ease forwards;
  animation-delay: var(--delay, 0s);
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-pulse {
  animation: pulse 2s infinite alternate;
}

.animate-wiggle {
  animation: wiggle 2.5s infinite;
}

/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes wiggle {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.95;
  }
  100% {
    transform: scale(1.05);
    opacity: 1;
  }
}
</style>

