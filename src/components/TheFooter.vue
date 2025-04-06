<template>
  <footer class="footer">
    <div class="footer__wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#f8f9fa"></path>
      </svg>
    </div>
    <div class="footer__content">
      <div class="footer__column footer__column--main">
        <div class="footer__info">
          <div class="footer__info-block">
            <div class="footer__info-title">Adresse :</div>
            <div class="footer__info-text">
              17 rue du vieux puits, 97351 Matoury
            </div>
          </div>
          <div class="footer__info-block">
            <div class="footer__info-title">Contact :</div>
            <div class="footer__contact">
              <a href="tel:1800123456" class="footer__link">
                <span class="footer__link-icon">📞</span>0694 12 34 56
              </a>
              <a href="mailto:info@relume.io" class="footer__link">
                <span class="footer__link-icon">✉️</span>info@doucine.fr
              </a>
            </div>
          </div>
        </div>
        <div class="footer__social">
          <a href="#" class="footer__social-link">
            <img
              src="../assets/images/facebook.svg"
              alt="Facebook"
              class="footer__social-icon"
            />
          </a>
          <!-- <a href="#" class="footer__social-link">
            <img
              src="../assets/images/twitter.svg"
              alt="Twitter"
              class="footer__social-icon"
            />
          </a>
          <a href="#" class="footer__social-link">
            <img
              src="../assets/images/instagram.svg"
              alt="Instagram"
              class="footer__social-icon"
            />
          </a>
          <a href="#" class="footer__social-link">
            <img
              src="../assets/images/linkedin.svg"
              alt="LinkedIn"
              class="footer__social-icon"
            />
          </a>
          <a href="#" class="footer__social-link">
            <img
              src="../assets/images/youtube.svg"
              alt="YouTube"
              class="footer__social-icon"
            />
          </a> -->
        </div>
      </div>

      <div class="footer__logo-center">
        <div class="footer__logo-container">
          <img
            class="navbar-logo"
            src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/b50c9fde289ac20a7a765b5b6329bc7df93b9511011838f82a9d74943f3e2070"
            alt="Logo"
          />
        </div>
      </div>

      <div class="footer__column footer__column--links">
        <div class="footer__nav-title">Navigation</div>
        <nav class="footer__nav">
          <ul class="footer__nav-list">
            <li><a href="/" class="footer__nav-link">Accueil</a></li>
            <li><a href="/a-propos" class="footer__nav-link">À propos</a></li>
            <li><a href="/services" class="footer__nav-link">Nos services</a></li>
            <li><a href="/projets" class="footer__nav-link">Réalisations</a></li>
            <li><a href="/contact" class="footer__nav-link">Contact</a></li>
          </ul>
          <ul class="footer__nav-list">
            <li><a href="/faq" class="footer__nav-link">FAQ</a></li>
            <li><a href="/blog" class="footer__nav-link">Blog</a></li>
            <li><a href="/devis" class="footer__nav-link">Demander un devis</a></li>
            <li><a href="/recrutement" class="footer__nav-link">Recrutement</a></li>
            <li><a href="/mentions-legales" class="footer__nav-link">Mentions légales</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="footer__credits">
      <div class="footer__credits-content">
        <div class="footer__copyright">
          © 2025 Doucine. Tous droits réservés.
        </div>
        <!-- <div class="footer__legal">
          <a href="#" class="footer__legal-link">Politique de confidentialité</a>
          <a href="#" class="footer__legal-link">Conditions de service</a>
          <a href="#" class="footer__legal-link">Paramètres des cookies</a>
        </div> -->
        <div class="footer__made-by">
          Site réalisé par
          <a
            href="https://harrowco.fr"
            class="footer__legal-link footer__brand-link"
            target="_blank"
            >Harrow&Co</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
.navbar-logo {
  width: 140px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.footer {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 100px 64px 40px;
  overflow: hidden;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  margin-top: 70px;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.03);
}

.footer__wave {
  position: absolute;
  top: -80px;
  left: 0;
  width: 100%;
  height: 120px;
  overflow: hidden;
  line-height: 0;
}

.footer__wave svg {
  position: relative;
  display: block;
  width: 100%;
  height: 120px;
  transform: rotateY(180deg);
}

.footer__content {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 40px 64px;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.footer__column {
  display: flex;
  min-width: 240px;
}

.footer__column--main {
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
  justify-content: flex-start;
  width: 32%;
}

.footer__logo-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28%;
  padding: 20px 0;
}

.footer__logo-container {
  background: white;
  padding: 30px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transform: rotate(-3deg);
  transition: all 0.5s ease;
  display: inline-block;
}

.footer__logo-container:hover {
  transform: rotate(0deg) scale(1.1);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.footer__info {
  align-self: stretch;
  margin-top: 32px;
  width: 100%;
  font-size: 16px;
  color: #2a3040;
}

.footer__info-block {
  width: 100%;
  margin-top: 24px;
  padding-left: 16px;
  border-left: 3px solid #5dc8e6;
  transition: all 0.3s ease;
}

.footer__info-block:hover {
  border-left-color: #eb1a3a;
  transform: translateX(5px);
}

.footer__info-block:first-child {
  margin-top: 0;
}

.footer__info-title {
  font-weight: 600;
  color: #2a3040;
  margin-bottom: 8px;
  font-size: 18px;
}

.footer__info-text {
  font-weight: 400;
  line-height: 1.6;
  font-size: 16px;
}

.footer__contact {
  width: 100%;
  font-weight: 400;
}

.footer__link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2a3040;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  padding: 8px 0;
  font-size: 16px;
}

.footer__link-icon {
  margin-right: 10px;
  font-size: 18px;
}

.footer__link:hover {
  color: #eb1a3a;
  transform: translateX(5px);
}

.footer__social {
  display: flex;
  margin-top: 32px;
  align-items: center;
  gap: 16px;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.footer__social-link:hover {
  transform: translateY(-5px) rotate(10deg);
}

.footer__social-link:nth-child(1):hover {
  background: #4267B2;
}

.footer__social-link:nth-child(2):hover {
  background: #1DA1F2;
}

.footer__social-link:nth-child(3):hover {
  background: #E1306C;
}

.footer__social-link:nth-child(4):hover {
  background: #0077B5;
}

.footer__social-link:nth-child(5):hover {
  background: #FF0000;
}

.footer__social-icon {
  width: 20px;
  height: 20px;
  filter: invert(30%) sepia(10%) saturate(1000%) hue-rotate(174deg) brightness(94%) contrast(87%);
  transition: all 0.3s ease;
}

.footer__social-link:hover .footer__social-icon {
  filter: brightness(0) invert(1);
}

.footer__column--links {
  align-items: flex-start;
  gap: 24px;
  overflow: hidden;
  font-size: 16px;
  color: #2a3040;
  font-weight: 500;
  justify-content: flex-start;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 32%;
}

.footer__nav-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #eb1a3a;
  position: relative;
  padding-bottom: 10px;
}

.footer__nav-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #eb1a3a 0%, #fbb018 100%);
  border-radius: 3px;
}

.footer__nav {
  display: flex;
  gap: 40px;
  width: 100%;
}

.footer__nav-list {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__nav-link {
  display: block;
  padding: 10px 0;
  color: #2a3040;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  font-size: 16px;
}

.footer__nav-link::before {
  content: "→";
  opacity: 0;
  margin-right: -15px;
  transition: all 0.3s ease;
  font-size: 18px;
}

.footer__nav-link:hover {
  color: #fbb018;
  padding-left: 20px;
}

.footer__nav-link:hover::before {
  opacity: 1;
  margin-right: 5px;
}

.footer__credits {
  margin-top: 80px;
  width: 100%;
  font-size: 16px;
  color: #4d5259;
  position: relative;
  z-index: 2;
  background: white;
  border-radius: 100px;
  padding: 20px 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.footer__credits-content {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer__copyright {
  font-weight: 400;
  font-size: 16px;
}

.footer__legal {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.footer__legal-link {
  color: #2a3040;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding: 0 3px;
  font-size: 16px;
}

.footer__legal-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: #5dc8e6;
  transition: all 0.3s ease;
}

.footer__legal-link:hover {
  color: #5dc8e6;
}

.footer__legal-link:hover::after {
  width: 100%;
}

.footer__brand-link {
  font-weight: 600;
}

.footer__made-by {
  font-size: 16px;
  color: #4d5259;
}

@media (max-width: 991px) {
  .footer {
    padding: 80px 20px 32px;
  }

  .footer__content {
    max-width: 100%;
    gap: 40px 20px;
    flex-direction: column;
  }

  .footer__column--main {
    max-width: 100%;
    width: 100%;
  }
  
  .footer__logo-center {
    width: 100%;
    order: -1;
    margin-bottom: 30px;
  }

  .footer__column--links {
    max-width: 100%;
    width: 100%;
  }

  .footer__nav {
    flex-direction: column;
    gap: 24px;
  }

  .footer__credits {
    padding: 20px;
    border-radius: 20px;
  }

  .footer__credits-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 24px;
  }

  .footer__legal {
    gap: 16px;
    justify-content: center;
  }
}
</style>
