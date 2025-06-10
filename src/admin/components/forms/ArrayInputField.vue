<template>
  <div class="mb-4">
    <label class="block mb-2 font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    
    <div class="space-y-3">
      <div 
        v-for="(item, index) in localItems" 
        :key="`${id}-${index}`" 
        class="flex gap-2 items-center"
      >
        <input 
          :id="`${id}-${index}`" 
          v-model="localItems[index]" 
          type="text" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          :class="{ 'border-red-500 bg-red-50': error }"
          :placeholder="placeholder"
          @input="updateModelValue"
        >
        <button 
          type="button" 
          @click="removeItem(index)" 
          class="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-danger transition-colors"
          title="Supprimer"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <button 
        type="button" 
        @click="addItem" 
        class="mt-2 text-sm text-primary hover:text-primary-600 flex items-center transition-colors"
      >
        <i class="fas fa-plus mr-2"></i> {{ addButtonText }}
      </button>
    </div>
    
    <div v-if="error" class="text-danger text-sm mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArrayInputField',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => ['']
    },
    placeholder: {
      type: String,
      default: ''
    },
    addButtonText: {
      type: String,
      default: 'Ajouter un élément'
    },
    required: {
      type: Boolean,
      default: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localItems: [...this.modelValue]
    };
  },
  watch: {
    modelValue: {
      handler(newValue) {
        // Éviter une boucle infinie en comparant les valeurs
        if (JSON.stringify(newValue) !== JSON.stringify(this.localItems)) {
          this.localItems = [...newValue];
        }
      },
      deep: true
    }
  },
  methods: {
    updateModelValue() {
      this.$emit('update:modelValue', [...this.localItems]);
    },
    
    addItem() {
      this.localItems.push('');
      this.updateModelValue();
      // Mettre le focus sur le nouvel élément après le rendu
      this.$nextTick(() => {
        const newIndex = this.localItems.length - 1;
        const newInput = document.getElementById(`${this.id}-${newIndex}`);
        if (newInput) {
          newInput.focus();
        }
      });
    },
    
    removeItem(index) {
      if (this.localItems.length > 1) {
        this.localItems.splice(index, 1);
        this.updateModelValue();
      }
    }
  }
};
</script>

