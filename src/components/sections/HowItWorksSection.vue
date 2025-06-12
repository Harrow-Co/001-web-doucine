<template>
  <div class="how-it-works-section">
    <div class="section-title">
      <div class="tagline">Engagement</div>
      <div class="content">
        <div class="heading">Découvrez le fonctionnement de DOUCINE</div>
        <div class="text">
          DOUCINE organise divers événements intergénérationnels pour renforcer
          les liens sociaux. Nous invitons les familles, les seniors et les
          bénévoles à participer activement.
        </div>
      </div>
    </div>
    <div class="content-grid">
      <div class="column">
        <div class="feature-item">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/41b66b25449f3e23e8e8ad9e180efb60656277252e3764a9a8f5d7a2531d0b41?placeholderIfAbsent=true"
            class="icon"
            alt="Types d'événements"
          />
          <div class="feature-content">
            <div class="feature-heading">Types d'événements</div>
            <div class="feature-text">
              Nous proposons des ateliers, des sorties et des activités ludiques
              pour tous les âges.
            </div>
          </div>
        </div>
        <div class="feature-item second">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/41b66b25449f3e23e8e8ad9e180efb60656277252e3764a9a8f5d7a2531d0b41?placeholderIfAbsent=true"
            class="icon"
            alt="Comment participer"
          />
          <div class="feature-content">
            <div class="feature-heading">Comment participer</div>
            <div class="feature-text">
              Inscrivez-vous sur notre site pour rejoindre nos événements et
              rencontrer d'autres membres de la communauté.
            </div>
          </div>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/48947e67fd47231787ac1fe11ed0464af97df1ef6999abda33013a4f05b83ce4?placeholderIfAbsent=true"
        class="center-image"
        alt="DOUCINE en action"
      />
      <div class="column">
        <div class="feature-item">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/41b66b25449f3e23e8e8ad9e180efb60656277252e3764a9a8f5d7a2531d0b41?placeholderIfAbsent=true"
            class="icon"
            alt="Engagement communautaire"
          />
          <div class="feature-content">
            <div class="feature-heading">Engagement communautaire</div>
            <div class="feature-text">
              Nous encourageons les bénévoles à s'impliquer et à partager leurs
              compétences avec les participants.
            </div>
          </div>
        </div>
        <div class="feature-item second">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/41b66b25449f3e23e8e8ad9e180efb60656277252e3764a9a8f5d7a2531d0b41?placeholderIfAbsent=true"
            class="icon"
            alt="Rejoignez-nous aujourd'hui"
          />
          <div class="feature-content">
            <div class="feature-heading">Rejoignez-nous aujourd'hui</div>
            <div class="feature-text">
              Participez à nos événements et contribuez à créer un environnement
              chaleureux et accueillant.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="secondary-button">En savoir plus</div>
      <div class="link-button">
        <div class="button-text">Inscription</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fc214b9bcdcd35a79483051c2c24d162ae792da41680c839105115b6d41197ec?placeholderIfAbsent=true"
          class="button-icon"
          alt="Flèche"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HowItWorksSection",
};
</script>

<style scoped>
.how-it-works-section {
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  padding: 112px 64px;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  color: #000;
  justify-content: start;
}

.section-title {
  display: flex;
  width: 768px;
  max-width: 100%;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  justify-content: start;
}

.tagline {
  align-self: center;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.content {
  margin-top: 16px;
  width: 100%;
}

.heading {
  font-size: 48px;
  font-weight: 700;
  line-height: 58px;
}

.text {
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-top: 24px;
}

.content-grid {
  align-self: stretch;
  display: flex;
  margin-top: 80px;
  width: 100%;
  align-items: center;
  gap: 40px 48px;
  text-align: center;
  justify-content: start;
  flex-wrap: wrap;
}

.column {
  align-self: stretch;
  min-width: 240px;
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.feature-item {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
}

.feature-item.second {
  margin-top: 64px;
}

.icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 48px;
  align-self: center;
}

.feature-content {
  margin-top: 24px;
  width: 100%;
}

.feature-heading {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
}

.feature-text {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 16px;
}

.center-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 540px;
  align-self: stretch;
  min-width: 240px;
  margin-top: auto;
  margin-bottom: auto;
}

.actions {
  display: flex;
  margin-top: 80px;
  align-items: center;
  gap: 24px;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  font-weight: 400;
  justify-content: start;
}

.secondary-button {
  align-self: stretch;
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  border-width: 1px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 12px 24px;
  gap: 8px;
  overflow: hidden;
}

.link-button {
  align-self: stretch;
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  white-space: nowrap;
  justify-content: center;
}

.button-text {
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
}

.button-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;
}

@media (max-width: 991px) {
  .how-it-works-section {
    padding: 100px 20px;
  }

  .tagline {
    white-space: initial;
  }

  .content {
    max-width: 100%;
  }

  .heading {
    max-width: 100%;
    font-size: 40px;
    line-height: 54px;
  }

  .text {
    max-width: 100%;
  }

  .content-grid {
    max-width: 100%;
    margin-top: 40px;
  }

  .feature-item.second {
    margin-top: 40px;
  }

  .center-image {
    max-width: 100%;
  }

  .actions {
    margin-top: 40px;
  }

  .secondary-button {
    padding-left: 20px;
    padding-right: 20px;
  }

  .link-button {
    white-space: initial;
  }
}
</style>
