<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#f8f9fa"></path>
      </svg>
    </div>
    <div class="footer__content">
      <div class="footer__column footer__column--main">
        <div class="footer__info">
          <div class="footer__info-block">
            <h3 class="footer__info-title">Adresse :</h3>
            <address class="footer__info-text">
              17 rue du vieux puits, 97351 Matoury
            </address>
          </div>
          <div class="footer__info-block">
            <h3 class="footer__info-title">Contact :</h3>
            <div class="footer__contact">
              <a href="tel:0694205231" class="footer__link" aria-label="Téléphone: 0694 20 52 31">
                <span class="footer__link-icon" aria-hidden="true">📞</span>0694 20 52 31
              </a>
              <a href="mailto:doucine97351@gmail.com" class="footer__link" aria-label="Email: doucine97351@gmail.com">
                <span class="footer__link-icon" aria-hidden="true">✉️</span>doucine97351@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div class="footer__social">
          <a href="#" class="footer__social-link" aria-label="Facebook">
            <img
              src="@/assets/images/facebook.svg"
              alt="Facebook"
              class="footer__social-icon"
            />
          </a>
          <!-- <a href="#" class="footer__social-link">
            <img
              src="@/assets/images/twitter.svg"
              alt="Twitter"
              class="footer__social-icon"
            />
          </a>
          <a href="#" class="footer__social-link">
            <img
              src="@/assets/images/instagram.svg"
              alt="Instagram"
              class="footer__social-icon"
            />
          </a>
          <a href="#" class="footer__social-link">
            <img
              src="@/assets/images/linkedin.svg"
              alt="LinkedIn"
              class="footer__social-icon"
            />
          </a>
          <a href="#" class="footer__social-link">
            <img
              src="@/assets/images/youtube.svg"
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
            src="@/assets/logo_doucine.png"
            alt="Logo Doucine"
          />
        </div>
      </div>

      <div class="footer__column footer__column--links">
        <h2 class="footer__nav-title">Navigation</h2>
        <nav class="footer__nav" aria-label="Liens de pied de page">
          <ul class="footer__nav-list">
            <li><router-link to="/" class="footer__nav-link">Accueil</router-link></li>
            <li><router-link to="/apropos" class="footer__nav-link">À propos</router-link></li>
            <!-- <li><a href="/services" class="footer__nav-link">Nos services</a></li> -->
            <li><router-link to="/evenement" class="footer__nav-link">Événements</router-link></li>
            <li><router-link to="/contact" class="footer__nav-link">Contact</router-link></li>
          </ul>
          <ul class="footer__nav-list">
            <!-- <li><router-link to="/faq" class="footer__nav-link">FAQ</router-link></li> -->
            <!-- <li><a href="/blog" class="footer__nav-link">Blog</a></li>
            <li><a href="/devis" class="footer__nav-link">Demander un devis</a></li> -->
            <!-- <li><router-link to="/recrutement" class="footer__nav-link">Recrutement</router-link></li> -->
            <li><router-link to="/mentions-legales" class="footer__nav-link">Mentions légales</router-link></li>
            <li><router-link to="/politique-confidentialite" class="footer__nav-link">Politique de confidentialité</router-link></li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="footer__credits">
      <div class="footer__credits-content">
        <div class="footer__copyright">
          © 2025 Doucine. Tous droits réservés.
        </div>
        <div class="footer__legal">
          <router-link to="/politique-confidentialite" class="footer__legal-link">Politique de confidentialité</router-link>
          <router-link to="/conditions-utilisation" class="footer__legal-link">Conditions d'utilisation</router-link>
        </div>
        <div class="footer__made-by">
          Site réalisé par
          <a
            href="https://harrowco.fr"
            class="footer__legal-link footer__brand-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site web de Harrow&Co, s'ouvre dans un nouvel onglet"
            >Harrow&Co</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter"
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer__info {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 24px;
}

.footer__info-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__info-title {
  color: #2a3040;
  font-weight: 700;
  font-size: 18px;
  margin: 0;
}

.footer__info-text {
  font-size: 16px;
  color: #4d5259;
  font-style: normal;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4d5259;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer__link:hover {
  color: #5dc8e6;
}

.footer__link:focus {
  outline: none;
}

.footer__link-icon {
  color: #5dc8e6;
  font-size: 18px;
}

.footer__social {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.footer__social-link {
  display: flex;
  width: 42px;
  height: 42px;
  background: #f1f5f9;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.footer__social-link:hover {
  background: #5dc8e6;
  transform: translateY(-2px);
}

.footer__social-link:focus {
  outline: none;
}

.footer__social-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.footer__column--links {
  flex-direction: column;
  width: 25%;
}

.footer__nav-title {
  color: #2a3040;
  font-weight: 700;
  font-size: 18px;
  margin: 0 0 24px;
}

.footer__nav {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.footer__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer__nav-link {
  color: #4d5259;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  font-size: 16px;
  padding-left: 20px;
}

.footer__nav-link::before {
  content: "→";
  position: absolute;
  left: 0;
  opacity: 0.7;
  transition: all 0.3s ease;
  margin-right: 0;
}

.footer__nav-link:hover {
  color: #5dc8e6;
}

.footer__nav-link:focus {
  outline: none;
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
