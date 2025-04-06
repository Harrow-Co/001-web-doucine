<template>
  <div class="testimonial-card">
    <div class="testimonial-card__content">
      <div class="testimonial-card__stars">
        <img
          v-for="(star, index) in stars"
          :key="index"
          :src="star"
          :alt="'Star rating'"
          class="testimonial-card__star-icon"
        />
      </div>
      <div class="testimonial-card__quote">
        {{ quote }}
      </div>
    </div>
    <div class="testimonial-card__avatar">
      <img
        :src="avatarSrc"
        :alt="name"
        class="testimonial-card__avatar-image"
      />
      <div class="testimonial-card__avatar-content">
        <div class="testimonial-card__name">{{ name }}</div>
        <div class="testimonial-card__role">{{ role }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestimonialCard",
  props: {
    stars: {
      type: Array,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    avatarSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.testimonial-card {
  background: #FAFAFA;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  min-width: 240px;
  padding: 32px;
  overflow: hidden;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  max-width: 350px;
  transition: all 0.3s ease;
  border-top: 3px solid #5DC8E6;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 30px rgba(93, 200, 230, 0.15);
}

.testimonial-card:nth-child(2) {
  border-top: 3px solid #FBB018;
}

.testimonial-card:nth-child(3) {
  border-top: 3px solid #EB1A3A;
}

.testimonial-card__content {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
}

.testimonial-card__stars {
  align-self: flex-start;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  overflow: hidden;
}

.testimonial-card__star-icon {
  aspect-ratio: 1.05;
  object-fit: contain;
  object-position: center;
  width: 20px;
  flex-shrink: 0;
  filter: invert(75%) sepia(75%) saturate(1126%) hue-rotate(341deg) brightness(100%) contrast(98%);
}

.testimonial-card__quote {
  color: #2A3040;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  margin-top: 24px;
  position: relative;
}

.testimonial-card__quote::before {
  content: "\201C";
  font-size: 80px;
  color: rgba(251, 176, 24, 0.1);
  position: absolute;
  top: -40px;
  left: -10px;
  z-index: 0;
  font-family: serif;
}

.testimonial-card__avatar {
  display: flex;
  margin-top: 32px;
  width: 100%;
  align-items: center;
  gap: 16px;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  color: #2A3040;
}

.testimonial-card__avatar-image {
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  width: 56px;
  border-radius: 50%;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;
  border: 3px solid #5DC8E6;
}

.testimonial-card:nth-child(2) .testimonial-card__avatar-image {
  border: 3px solid #FBB018;
}

.testimonial-card:nth-child(3) .testimonial-card__avatar-image {
  border: 3px solid #EB1A3A;
}

.testimonial-card__avatar-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.testimonial-card__name {
  font-weight: 600;
  color: #2A3040;
}

.testimonial-card__role {
  font-weight: 400;
  font-size: 14px;
  color: #EB1A3A;
}

@media (max-width: 991px) {
  .testimonial-card {
    padding: 24px;
  }
}
</style>
