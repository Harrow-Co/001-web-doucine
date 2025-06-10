<template>
  <div class="mb-4">
    <label :for="id" class="block mb-2 font-medium text-gray-700">{{ label }}</label>
    
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <input 
          :id="id" 
          v-model="inputValue" 
          type="text" 
          :placeholder="placeholder"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          @input="checkImagePreview"
        >
        <button 
          v-if="modelValue"
          type="button" 
          class="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-danger transition-colors"
          @click="clearImage" 
          title="Effacer l'URL d'image"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <small class="text-sm text-gray-500">{{ helpText }}</small>
      
      <div v-if="showPreview" class="mt-3 relative">
        <div class="w-full h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img 
            :src="modelValue" 
            alt="Prévisualisation" 
            class="w-full h-full object-cover"
            @error="handleImageError"
          >
        </div>
        <button 
          type="button" 
          @click="clearImage" 
          class="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full flex items-center justify-center text-danger shadow-sm transition-all"
          title="Supprimer l'image"
        >
          <i class="fas fa-trash text-sm"></i>
        </button>
      </div>
      
      <div v-if="hasError" class="flex items-center gap-2 p-3 bg-red-50 text-danger rounded-md text-sm">
        <i class="fas fa-exclamation-triangle"></i>
        <span>L'URL d'image semble invalide. Veuillez vérifier le lien.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageUploadField',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Image'
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Ex: https://example.com/image.jpg'
    },
    helpText: {
      type: String,
      default: 'Entrez l\'URL d\'une image pour illustrer l\'événement.'
    }
  },
  data() {
    return {
      showPreview: false,
      hasError: false,
      inputValue: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
      this.checkImagePreview();
    },
    inputValue(newValue) {
      this.$emit('update:modelValue', newValue);
    }
  },
  mounted() {
    this.checkImagePreview();
  },
  methods: {
    checkImagePreview() {
      if (this.inputValue && this.inputValue.trim()) {
        this.showPreview = true;
        this.hasError = false;
      } else {
        this.showPreview = false;
      }
    },
    
    handleImageError() {
      this.hasError = true;
    },
    
    clearImage() {
      this.inputValue = '';
      this.showPreview = false;
      this.hasError = false;
      this.$emit('update:modelValue', '');
    }
  }
};
</script>

