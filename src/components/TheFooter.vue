<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__column footer__column--main">
        <img
          src="../assets/images/logo.svg"
          alt="Company Logo"
          class="footer__logo"
        />
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
              <a href="tel:1800123456" class="footer__link">0694 12 34 56</a>
              <a href="mailto:info@relume.io" class="footer__link"
                >info@doucine.fr</a
              >
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
          <a href="#" class="footer__social-link">
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
          </a>
        </div>
      </div>

      <div class="footer__column footer__column--links">
        <nav class="footer__nav">
          <ul class="footer__nav-list">
            <li><a href="#" class="footer__nav-link">Lien Un</a></li>
            <li><a href="#" class="footer__nav-link">Lien Deux</a></li>
            <li><a href="#" class="footer__nav-link">Lien Trois</a></li>
            <li><a href="#" class="footer__nav-link">Lien Quatre</a></li>
            <li><a href="#" class="footer__nav-link">Lien Cinq</a></li>
          </ul>
          <ul class="footer__nav-list">
            <li><a href="#" class="footer__nav-link">Lien Six</a></li>
            <li><a href="#" class="footer__nav-link">Lien Sept</a></li>
            <li><a href="#" class="footer__nav-link">Lien Huit</a></li>
            <li><a href="#" class="footer__nav-link">Lien Neuf</a></li>
            <li><a href="#" class="footer__nav-link">Lien Dix</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="footer__credits">
      <div class="footer__divider"></div>
      <div class="footer__credits-content">
        <div class="footer__copyright">
          © 2025 Doucine. Tous droits réservés.
        </div>
        <div class="footer__legal">
          <a href="#" class="footer__legal-link"
            >Politique de confidentialité</a
          >
          <a href="#" class="footer__legal-link">Conditions de service</a>
          <a href="#" class="footer__legal-link">Paramètres des cookies</a>
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
.footer {
  background-color: #ffffff;
  padding: 80px 64px;
  overflow: hidden;
}

.footer__content {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 40px 64px;
  justify-content: flex-start;
  flex-wrap: wrap;
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
  width: 864px;
}

.footer__logo {
  aspect-ratio: 2.33;
  object-fit: contain;
  object-position: center;
  width: 84px;
}

.footer__info {
  align-self: stretch;
  margin-top: 32px;
  width: 100%;
  font-family:
    Roboto,
    -apple-system,
    Helvetica,
    sans-serif;
  font-size: 14px;
  color: #000000;
}

.footer__info-block {
  width: 100%;
  margin-top: 24px;
}

.footer__info-block:first-child {
  margin-top: 0;
}

.footer__info-title {
  font-weight: 600;
}

.footer__info-text {
  font-weight: 400;
  margin-top: 4px;
}

.footer__contact {
  margin-top: 4px;
  width: 100%;
  font-weight: 400;
}

.footer__link {
  display: block;
  text-decoration: underline;
  color: inherit;
}

.footer__social {
  display: flex;
  margin-top: 32px;
  align-items: flex-start;
  gap: 12px;
}

.footer__social-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
}

.footer__column--links {
  align-items: flex-start;
  gap: 24px;
  overflow: hidden;
  font-family:
    Roboto,
    -apple-system,
    Helvetica,
    sans-serif;
  font-size: 14px;
  color: #000000;
  font-weight: 600;
  justify-content: flex-start;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.footer__nav {
  display: flex;
  gap: 24px;
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
  padding: 8px 0;
  color: inherit;
  text-decoration: none;
}

.footer__credits {
  margin-top: 80px;
  width: 100%;
  font-family:
    Roboto,
    -apple-system,
    Helvetica,
    sans-serif;
  font-size: 14px;
  color: #000000;
  font-weight: 400;
}

.footer__divider {
  background-color: #000000;
  border: 1px solid #000000;
  min-height: 1px;
  width: 100%;
}

.footer__credits-content {
  display: flex;
  margin-top: 32px;
  width: 100%;
  align-items: flex-start;
  gap: 40px 100px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer__legal {
  display: flex;
  min-width: 240px;
  align-items: flex-start;
  gap: 24px;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.footer__legal-link {
  color: inherit;
  text-decoration: underline;
}

@media (max-width: 991px) {
  .footer {
    padding: 80px 20px;
  }

  .footer__column--main {
    max-width: 100%;
  }

  .footer__info {
    max-width: 100%;
  }

  .footer__credits {
    max-width: 100%;
    margin-top: 40px;
  }

  .footer__divider {
    max-width: 100%;
  }

  .footer__credits-content {
    max-width: 100%;
  }

  .footer__legal {
    max-width: 100%;
  }
}
</style>
