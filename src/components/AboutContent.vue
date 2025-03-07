<template>
  <div class="content-wrapper">
    <div class="logo-section">
      <svg
        width="80"
        height="81"
        viewBox="0 0 80 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="logo"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M69.1 24.2334L68.6333 23.4C68.0313 22.3923 67.1823 21.5548 66.1666 20.9667L43.8 8.06669C42.7873 7.47919 41.6377 7.16875 40.4667 7.16669H39.5C38.329 7.16875 37.1793 7.47919 36.1667 8.06669L13.8 21C12.7899 21.5842 11.9509 22.4233 11.3667 23.4334L10.9 24.2667C10.3125 25.2795 10.0021 26.4292 10 27.6V53.4333C10.0021 54.6043 10.3125 55.754 10.9 56.7667L11.3667 57.6C11.966 58.5983 12.8016 59.434 13.8 60.0333L36.2 72.9333C37.2077 73.533 38.3607 73.8443 39.5333 73.8333H40.4667C41.6377 73.8313 42.7873 73.521 43.8 72.9333L66.1666 60C67.1866 59.429 68.029 58.5867 68.6 57.5667L69.1 56.7333C69.6803 55.7177 69.9903 54.57 70 53.4V27.5667C69.998 26.3958 69.6876 25.2462 69.1 24.2334ZM39.5 13.8334H40.4667L60 25.1L40 36.6333L20 25.1L39.5 13.8334ZM43.3333 65.5L62.8333 54.2333L63.3333 53.4V30.8667L43.3333 42.4333V65.5Z"
          fill="black"
        />
      </svg>
    </div>

    <div class="text-content">
      <h1 class="title">Notre Histoire et Nos Objectifs</h1>
      <p class="description">
        DOUCINE a été fondée pour créer des liens sociaux significatifs entre
        les générations. Notre objectif est de promouvoir le bien-être et
        l'engagement communautaire à travers des événements
        intergénérationnels.
      </p>

      <div class="button-group">
        <button class="primary-button">En Savoir Plus</button>
        <a href="#contact" class="contact-link">
          <span>Contact</span>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="arrow-icon"
          >
            <path
              d="M9.70697 17.4496L15.414 11.7426L9.70697 6.03564L8.29297 7.44964L12.586 11.7426L8.29297 16.0356L9.70697 17.4496Z"
              fill="black"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutContent",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 616px;
}

.logo-section {
  margin-bottom: 24px;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  font-family: "Roboto", sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 120%;
  color: #000;
  margin-bottom: 24px;
}

.description {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  color: #000;
  margin-bottom: 32px;
}

.button-group {
  display: flex;
  gap: 24px;
  align-items: center;
}

.primary-button {
  padding: 12px 24px;
  border: 1px solid #000;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: #000;
  cursor: pointer;
  background: transparent;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  color: #000;
  cursor: pointer;
  text-decoration: none;
}
</style>
