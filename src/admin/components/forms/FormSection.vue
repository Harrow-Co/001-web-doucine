<template>
  <div class="mb-6 overflow-hidden">
    <div>
      <div class="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
        <h3 class="m-0 text-lg font-semibold text-blue-500">{{ title }}</h3>
        <div class="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
          <i :class="icon"></i>
        </div>
      </div>
      
      <div class="p-4 sm:p-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormSection',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: 'fas fa-info-circle'
    }
  }
};
</script>

