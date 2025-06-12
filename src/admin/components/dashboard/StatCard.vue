<template>
  <div class="bg-white rounded-lg shadow-sm p-4 flex items-center w-full card-hover">
    <div class="bg-opacity-15 mr-3" :class="`bg-${color}`">
      <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl" :class="`text-${color}`">
        <i :class="icon"></i>
      </div>
    </div>
    <div class="flex-1">
      <p class="text-sm text-gray-500 m-0">{{ title }}</p>
      <h3 class="text-xl font-bold text-gray-700 m-0 mb-1">{{ value }}</h3>
      <p v-if="change" class="text-xs flex items-center m-0" :class="changeColorClass">
        <i :class="changeIconClass + ' mr-1'"></i> {{ change }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
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
    change: {
      type: String,
      default: ''
    },
    changeType: {
      type: String,
      default: 'neutral', // 'positive', 'negative', or 'neutral'
      validator: (value) => ['positive', 'negative', 'neutral'].includes(value)
    }
  },
  computed: {
    changeColorClass() {
      return {
        'positive': 'text-green-500',
        'negative': 'text-danger',
        'neutral': 'text-gray-500'
      }[this.changeType];
    },
    changeIconClass() {
      return {
        'positive': 'fas fa-arrow-up',
        'negative': 'fas fa-arrow-down',
        'neutral': 'fas fa-minus'
      }[this.changeType];
    }
  }
};
</script> 