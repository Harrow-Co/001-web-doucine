<template>
  <section class="bg-gradient-to-br from-primary-50 to-primary-100 py-28 px-4 md:px-16 flex flex-col overflow-hidden items-stretch font-sans justify-center rounded-2xl relative">
    <!-- Élément décoratif -->
    <div class="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-secondary-300 to-secondary-100 opacity-30 rounded-full z-0"></div>
    
    <div class="flex w-full items-start gap-20 justify-between flex-wrap relative z-10">
      <div class="min-w-[240px] flex-1 flex-shrink relative">
        <h2 class="text-3xl md:text-4xl font-bold leading-tight text-gray-800 relative">
          Rejoignez notre communauté dynamique
          <span class="absolute -bottom-4 left-0 w-20 h-1 bg-danger rounded"></span>
        </h2>
      </div>
      
      <div class="min-w-[240px] flex flex-col items-start font-normal justify-start flex-1 flex-shrink basis-0">
        <p class="text-gray-600 text-lg leading-relaxed">
          Ensemble, nous pouvons créer des liens significatifs et enrichir la
          vie des seniors et des familles. Devenez bénévole et faites une
          différence dans votre communauté.
        </p>
        <div class="self-start flex mt-8 items-center gap-4 text-base justify-start md:flex-row flex-col md:self-start self-stretch">
          <button class="btn btn-primary md:w-auto w-full">
            Postulez
          </button>
          <button class="btn btn-secondary md:w-auto w-full">
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CommunityCTA",
};
</script>

<style scoped>
.community-cta {
  background: linear-gradient(135deg, rgba(93, 200, 230, 0.1) 0%, rgba(93, 200, 230, 0.2) 100%);
  display: flex;
  padding: 112px 64px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  justify-content: center;
  border-radius: 20px;
  position: relative;
}

.community-cta:before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, rgba(251, 176, 24, 0.3) 0%, rgba(251, 176, 24, 0.1) 100%);
  border-radius: 50%;
  z-index: 0;
}

.community-cta__container {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 80px;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.community-cta__title {
  min-width: 240px;
  font-size: 42px;
  color: #2A3040;
  font-weight: 700;
  line-height: 1.3;
  flex: 1;
  flex-shrink: 1;
  position: relative;
}

.community-cta__title:after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 80px;
  height: 4px;
  background: #EB1A3A;
  border-radius: 2px;
}

.community-cta__content {
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 400;
  justify-content: flex-start;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.community-cta__text {
  color: #4D5259;
  font-size: 18px;
  line-height: 1.7;
}

.community-cta__actions {
  align-self: flex-start;
  display: flex;
  margin-top: 32px;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  justify-content: flex-start;
}

@media (max-width: 991px) {
  .community-cta {
    padding: 100px 20px;
  }

  .community-cta__container {
    max-width: 100%;
    gap: 40px;
  }

  .community-cta__title {
    max-width: 100%;
    font-size: 36px;
    line-height: 1.3;
  }

  .community-cta__content {
    max-width: 100%;
  }

  .community-cta__text {
    max-width: 100%;
  }
  
  .community-cta__actions {
    flex-direction: column;
    align-self: stretch;
    gap: 12px;
  }
  
  .community-cta__actions button {
    width: 100%;
  }
}
</style>
