<template>
  <div class="mb-4">
    <label :for="id" class="block mb-2 font-medium text-gray-700">
      {{ label }} <span v-if="required" class="text-danger">*</span>
    </label>
    
    <input 
      v-if="type !== 'textarea' && type !== 'select'"
      :id="id" 
      v-model="inputValue" 
      :type="type"
      :required="required" 
      :placeholder="placeholder"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
      :class="{ 'border-red-500 bg-red-50': error }"
    >
    
    <textarea 
      v-else-if="type === 'textarea'"
      :id="id" 
      v-model="inputValue" 
      :rows="rows"
      :required="required"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
      :class="{ 'border-red-500 bg-red-50': error }"
      :placeholder="placeholder"
    ></textarea>
    
    <select
      v-else
      :id="id"
      v-model="inputValue"
      :required="required"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none transition-colors"
      :class="{ 'border-red-500 bg-red-50': error }"
      style="background-image: url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e'); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem;"
    >
      <option value="">Sélectionner...</option>
      <slot></slot>
    </select>
    
    <div v-if="error" class="text-danger text-sm mt-1">
      {{ error }}
    </div>
    
    <small v-if="helpText" class="text-sm text-gray-500 mt-1 block">{{ helpText }}</small>
  </div>
</template>

<script>
export default {
  name: 'FormField',
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
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'email', 'number', 'date', 'textarea', 'select'].includes(value)
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    error: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    },
    inputValue(newValue) {
      this.$emit('update:modelValue', newValue);
    }
  }
};
</script>

