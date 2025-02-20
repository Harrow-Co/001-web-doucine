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
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  border-width: 1px;
  min-width: 240px;
  padding: 32px;
  overflow: hidden;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
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
}

.testimonial-card__quote {
  color: #000000;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  margin-top: 24px;
}

.testimonial-card__avatar {
  display: flex;
  margin-top: 24px;
  width: 100%;
  align-items: center;
  gap: 16px;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 16px;
  color: #000000;
}

.testimonial-card__avatar-image {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 48px;
  border-radius: 50%;
  align-self: stretch;
  margin-top: auto;
  margin-bottom: auto;
  flex-shrink: 0;
}

.testimonial-card__avatar-content {
  align-self: stretch;
  min-width: 240px;
  margin-top: auto;
  margin-bottom: auto;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}

.testimonial-card__name {
  font-weight: 600;
}

.testimonial-card__role {
  font-weight: 400;
}

@media (max-width: 991px) {
  .testimonial-card {
    padding: 20px;
  }
}
</style>
