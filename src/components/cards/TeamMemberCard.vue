<template>
  <div class="team-member-card">
    <img
      :src="member.image"
      :srcset="member.srcset"
      class="member-image"
      loading="lazy"
      :alt="member.name"
    />

    <div class="content">
      <div class="title-wrapper">
        <div class="name">{{ member.name }}</div>
        <div class="job-title">{{ member.title }}</div>
      </div>
      <!-- <div class="description">{{ member.description }}</div> -->
    </div>

    <!-- <div class="social-icons">
      <img
        v-for="(icon, index) in member.socialIcons"
        :key="index"
        :src="icon"
        class="social-icon"
        loading="lazy"
        alt="Social media icon"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  name: "TeamMemberCard",
  props: {
    member: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.team-member-card {
  display: flex;
  max-width: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex: 1;
  flex-shrink: 1;
  flex-basis: 0%;

}

.member-image {
  aspect-ratio: 1.03;
  object-fit: cover;
  object-position: center;
  width: 50%;
  border-radius: 40px;
}

.content {
  margin-top: 16px;
  width: 100%;
  font-family:
    Roboto,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  color: #000000;
  text-align: center;
}

.title-wrapper {
  width: 100%;
}

.name {
  font-size: 18px;
  font-weight: 600;
}

.job-title {
  font-size: 16px;
  font-weight: 400;
}

.description {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 12px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.social-icons {
  align-self: center;
  display: flex;
  margin-top: 16px;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.social-icon {
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 20px;
  flex-shrink: 0;
}
</style>
