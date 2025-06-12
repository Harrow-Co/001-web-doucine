<template>
  <div class="mb-4">
    <label :for="id" class="block mb-2 font-medium text-gray-700">{{ label }}</label>
    
    <div class="space-y-3">
      <!-- Option de téléchargement de fichier -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary transition-colors">
        <input 
          type="file" 
          :id="`${id}-file`" 
          accept="image/*"
          class="hidden" 
          @change="handleFileUpload"
          ref="fileInput"
        >
        <div class="flex flex-col items-center justify-center cursor-pointer" @click="triggerFileInput">
          <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
          <p class="text-sm text-gray-600 text-center">Cliquez pour télécharger une image</p>
          <p class="text-xs text-gray-500 mt-1">ou glissez-déposez un fichier image ici</p>
        </div>
      </div>
      
      <!-- Séparateur OU -->
      <div class="flex items-center justify-center">
        <div class="flex-grow h-px bg-gray-200"></div>
        <span class="px-4 text-sm text-gray-500">OU</span>
        <div class="flex-grow h-px bg-gray-200"></div>
      </div>
      
      <!-- Option URL -->
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
          title="Effacer l'image"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <small class="text-sm text-gray-500">{{ helpText }}</small>
      
      <!-- Indicateur de chargement -->
      <div v-if="uploading" class="flex items-center gap-2 p-3 bg-blue-50 text-primary rounded-md text-sm">
        <i class="fas fa-spinner fa-spin"></i>
        <span>Téléchargement en cours...</span>
      </div>
      
      <!-- Prévisualisation de l'image -->
      <div v-if="showPreview" class="mt-3 relative">
        <div class="w-full h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <img 
            :src="previewSrc" 
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
        <span>{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { secureAxios } from '../../services/eventService';
import { getImageUrl, apiConfig } from '../../../utils/imageUtils';

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
      default: 'Téléchargez une image ou entrez son URL pour illustrer l\'événement.'
    }
  },
  data() {
    return {
      showPreview: false,
      hasError: false,
      errorMessage: 'L\'URL d\'image semble invalide. Veuillez vérifier le lien.',
      inputValue: this.modelValue,
      uploading: false,
      fileToUpload: null
    };
  },
  computed: {
    previewSrc() {
      return getImageUrl(this.modelValue);
    }
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
    
    // Ajouter un gestionnaire d'événements pour le glisser-déposer
    const dropZone = this.$el.querySelector('.border-dashed');
    if (dropZone) {
      dropZone.addEventListener('dragover', this.handleDragOver);
      dropZone.addEventListener('dragleave', this.handleDragLeave);
      dropZone.addEventListener('drop', this.handleDrop);
    }
  },
  beforeUnmount() {
    // Nettoyer les gestionnaires d'événements
    const dropZone = this.$el.querySelector('.border-dashed');
    if (dropZone) {
      dropZone.removeEventListener('dragover', this.handleDragOver);
      dropZone.removeEventListener('dragleave', this.handleDragLeave);
      dropZone.removeEventListener('drop', this.handleDrop);
    }
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
      this.errorMessage = 'L\'image ne peut pas être chargée. Veuillez vérifier le lien.';
    },
    
    clearImage() {
      this.inputValue = '';
      this.showPreview = false;
      this.hasError = false;
      this.fileToUpload = null;
      this.$emit('update:modelValue', '');
    },
    
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      if (!this.validateImageFile(file)) {
        return; // La validation a échoué et les messages d'erreur sont déjà définis
      }
      
      await this.uploadImageToServer(file);
    },
    
    validateImageFile(file) {
      // Vérifier si c'est bien une image
      if (!file.type.startsWith('image/')) {
        this.hasError = true;
        this.errorMessage = 'Le fichier sélectionné n\'est pas une image valide.';
        return false;
      }
      
      // Vérifier la taille (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        this.hasError = true;
        this.errorMessage = 'L\'image est trop volumineuse. Taille maximale: 5MB.';
        return false;
      }
      
      return true;
    },
    
    async uploadImageToServer(file) {
      try {
        this.uploading = true;
        this.hasError = false;
        
        // Créer un FormData pour l'upload
        const formData = new FormData();
        formData.append('image', file);
        
        // Envoyer le fichier au serveur
        const response = await secureAxios.post(`${apiConfig.getApiUrl()}/admin/events/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Mettre à jour le modèle avec le chemin de l'image
        this.inputValue = response.data.imagePath;
        this.showPreview = true;
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
        this.hasError = true;
        this.errorMessage = 'Erreur lors du téléchargement de l\'image. Veuillez réessayer.';
      } finally {
        this.uploading = false;
      }
    },
    
    handleDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.classList.add('border-primary');
    },
    
    handleDragLeave(event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.classList.remove('border-primary');
    },
    
    handleDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.classList.remove('border-primary');
      
      const dt = event.dataTransfer;
      const files = dt.files;
      
      if (files.length) {
        this.$refs.fileInput.files = files;
        this.handleFileUpload({ target: { files } });
      }
    }
  }
};
</script>

