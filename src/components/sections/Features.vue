<template>
  <section class="bg-white py-28 px-4 md:px-16 flex flex-col items-center">
    <div class="max-w-3xl text-center">
      <h2 class="text-4xl font-bold text-gray-800 relative inline-block pb-5 mb-4">
        Découvrez nos initiatives pour tous les âges
        <span class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-danger to-secondary rounded"></span>
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Nous croyons fermement que les liens sociaux enrichissent la vie.
        Rejoignez-nous pour créer un environnement où chaque génération peut
        s'épanouir ensemble.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="bg-gray-50 p-10 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg text-center"
      >
        <div :class="`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${getIconBgClass(index)}`">
          <img :src="feature.icon" :alt="feature.title" class="w-10 h-10 object-contain invert brightness-200" />
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">{{ feature.title }}</h3>
        <p class="text-gray-600">{{ feature.description }}</p>
      </div>
    </div>

    <div class="flex items-center gap-6 mt-20">
      <button class="btn btn-primary" @click="openRegistrationModal" style="background-color:#EB1A3A;">Rejoindre</button> 

      <div class="link-button" @click="navigateTo('/apropos')">
        <div class="flex items-center gap-2 text-primary font-semibold cursor-pointer transition-transform duration-300 hover:translate-x-1">
        <span>En savoir plus</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/9cc59fc65142f42773e3131d8a5a5a8d452f8191d61b72aca044880ddbb310ec"
          alt="Arrow"
          class="w-6 h-6 object-contain"
        />
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: "TheFeatures",
  setup() {
    const router = useRouter();
    return {
      navigateTo: (path) => router.push(path)
    };
  },
  data() {
    return {
      features: [
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/766acbcbce9a93a4dfbdc668699203ebbc3c253fe3b3bf3ffdd57997607b4f5f",
          title: "Promouvoir les connexions sociales",
          description:
            "Nous facilitons des rencontres qui renforcent les relations entre les participants.",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/fa6119d5f81204fe6d3516d96540d57df07aacd17aae3a163ee6969b8454b114",
          title: "Organiser des événements intergénérationnels",
          description:
            "Nos événements rassemblent les jeunes et les seniors pour partager des expériences.",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/d278b390c44445929c02ffebdbd8933f/5f9f666004ce497ec7d158ff7000b2ab665a4db3c262ef12313da399d19826b6",
          title: "Favoriser l'engagement communautaire",
          description:
            "Nous encourageons les bénévoles à s'impliquer activement dans notre communauté.",
        },
      ],
    };
  },
  methods: {
    getIconBgClass(index) {
      const classes = [
        'bg-danger',
        'bg-secondary',
        'bg-primary',
      ];
      return classes[index % classes.length];
    },
    openRegistrationModal() {
      this.$emit('open-registration-modal');
    }
  }
};
</script>
