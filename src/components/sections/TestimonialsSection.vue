<template>
  <section class="testimonials section">
    <div class="testimonials__header">
      <span class="testimonials__tag">Expériences</span>
      <h2 class="testimonials__title">Témoignages clients</h2>
      <p class="testimonials__subtitle">
        Une expérience enrichissante et mémorable pour tous.
      </p>
    </div>
    <div class="testimonials__content">
      <div class="testimonials__grid">
        <TestimonialCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          v-bind="testimonial"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TestimonialCard from "../cards/TestimonialCard.vue";

export default {
  name: "TestimonialsSection",
  components: {
    TestimonialCard,
  },
  data() {
    return {
      testimonials: [
        {
          stars: [
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7e4df2cd1a7939a31855fa8e82b1b9421fc9a6af4643291313cbb9984d060bb0",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/c0c0bd8cc1994f0be2e0642388ec16bd4b1bc4935b17d8279bcaf5016e8ee791",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/6492427b26d551634b06b884159efd7b9ff17e227204207e2065cf0e2749ff87",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/6f66ea5cb396f9564b8619100f01df2975821083982d37f157be09daff4bb256",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/91d3dc9c2ee6e66b36a93cb1f8ae9cf8d9165b92cb08d0a068d0b07e99686fb7",
          ],
          quote: "Les événements m'ont permis de me sentir vivant et connecté.",
          avatarSrc:
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/300157c7c118e75896d9a10a5d0321ef68674d6b8cc60671d60f7ce825708888",
          name: "Marie Dupont",
          role: "Bénévole, DOUCINE",
        },
        {
          stars: [
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7e4df2cd1a7939a31855fa8e82b1b9421fc9a6af4643291313cbb9984d060bb0",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/f83b7e20159586c59267bb7091fa58f00f974209e14e60cc18946689549d95ab",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/ce3e50b3453406962abd5d2a06159532ec8c44c3b264a5637b75b42a8c32d90b",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/6f66ea5cb396f9564b8619100f01df2975821083982d37f157be09daff4bb256",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/ad7fd093df8c4294bef3e63a34ac6b5cfe73e3021301cb23a722544fad2e8b38",
          ],
          quote: "Chaque rencontre est une nouvelle amitié qui se crée.",
          avatarSrc:
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/300157c7c118e75896d9a10a5d0321ef68674d6b8cc60671d60f7ce825708888",
          name: "Jean Martin",
          role: "Participant, Famille",
        },
        {
          stars: [
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/7e4df2cd1a7939a31855fa8e82b1b9421fc9a6af4643291313cbb9984d060bb0",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/c0c0bd8cc1994f0be2e0642388ec16bd4b1bc4935b17d8279bcaf5016e8ee791",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/6492427b26d551634b06b884159efd7b9ff17e227204207e2065cf0e2749ff87",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/6f66ea5cb396f9564b8619100f01df2975821083982d37f157be09daff4bb256",
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/91d3dc9c2ee6e66b36a93cb1f8ae9cf8d9165b92cb08d0a068d0b07e99686fb7",
          ],
          quote: "Les activités intergénérationnelles sont un vrai bonheur.",
          avatarSrc:
            "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/300157c7c118e75896d9a10a5d0321ef68674d6b8cc60671d60f7ce825708888",
          name: "Sophie Laurent",
          role: "Membre, DOUCINE",
        },
      ],
    };
  },
};
</script>

<style scoped>
.testimonials {
  background: #fff;
  display: flex;
  padding: 112px 64px;
  flex-direction: column;
  overflow: hidden;
  align-items: stretch;
  position: relative;
}

.testimonials:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(93, 200, 230, 0.05) 100%);
  z-index: 0;
}

.testimonials__header {
  align-self: center;
  width: 560px;
  max-width: 100%;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  text-align: center;
  position: relative;
  z-index: 1;
}

.testimonials__tag {
  display: inline-block;
  background: rgba(235, 26, 58, 0.1);
  color: #EB1A3A;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  margin-bottom: 16px;
}

.testimonials__title {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  color: #2A3040;
  position: relative;
  display: inline-block;
  padding-bottom: 20px;
}

.testimonials__title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #EB1A3A 0%, #FBB018 100%);
  border-radius: 2px;
}

.testimonials__subtitle {
  font-size: 18px;
  font-weight: 400;
  margin-top: 24px;
  color: #4D5259;
  line-height: 1.7;
}

.testimonials__content {
  margin-top: 80px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.testimonials__grid {
  display: flex;
  width: 100%;
  align-items: stretch;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 991px) {
  .testimonials {
    padding: 100px 20px;
  }

  .testimonials__title {
    font-size: 36px;
  }

  .testimonials__content {
    margin-top: 40px;
  }
  
  .testimonials__grid {
    gap: 20px;
  }
}
</style>
