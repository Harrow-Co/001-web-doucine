<template>
  <div 
    class="card card-hover flex items-center relative overflow-hidden cursor-pointer" 
    @click="navigateOrEmit"
  >
    <div class="absolute left-0 top-0 h-full w-1" :class="`bg-${color}`"></div>
    <div class="bg-opacity-15 w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4" :class="`bg-${color} text-${color}`">
      <i :class="icon"></i>
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-700 m-0 mb-2">{{ title }}</h3>
      <p class="text-sm text-gray-500 m-0">{{ description }}</p>
      
      <button 
        v-if="buttonText" 
        class="mt-3 px-4 py-1.5 text-sm font-medium rounded-md transition-colors"
        :class="`bg-${color} bg-opacity-10 text-${color} hover:bg-opacity-20`"
        @click.stop="navigateOrEmit"
      >
        {{ buttonText }}
      </button>
    </div>
    <div class="text-opacity-0 transform -translate-x-2 transition-all duration-300 group-hover:text-opacity-100 group-hover:translate-x-0" :class="`text-${color}`">
      <i class="fas fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    buttonText: {
      type: String,
      default: ''
    },
    buttonUrl: {
      type: String,
      default: ''
    }
  },
  emits: ['action'],
  methods: {
    navigateOrEmit() {
      if (this.buttonUrl) {
        this.$router.push(this.buttonUrl);
      } else {
        this.$emit('action');
      }
    }
  }
};
</script> 