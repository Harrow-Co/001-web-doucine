<template>
  <div class="mb-5">
    <label class="block mb-2 font-medium text-gray-700">{{ label }} <span v-if="required" class="text-red-500">*</span></label>
    
    <div class="flex gap-5 sm:flex-col sm:gap-0">
      <div class="flex-1 mb-4">
        <label :for="`${id}-jour`" class="block text-sm font-normal mb-1">Jour <span v-if="required" class="text-red-500">*</span></label>
        <input 
          :id="`${id}-jour`" 
          v-model="localDate.jour" 
          type="text" 
          :required="required" 
          placeholder="Ex: 29"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500 bg-red-50': errors.jour }"
          @input="updateDate"
        >
        <div v-if="errors.jour" class="text-red-500 text-sm mt-1">
          {{ errors.jour }}
        </div>
      </div>
      
      <div class="flex-1 mb-4">
        <label :for="`${id}-mois`" class="block text-sm font-normal mb-1">Mois <span v-if="required" class="text-red-500">*</span></label>
        <select 
          :id="`${id}-mois`" 
          v-model="localDate.mois" 
          :required="required" 
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          :class="{ 'border-red-500 bg-red-50': errors.mois }"
          style="background-image: url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e'); background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em 1.5em; padding-right: 2.5rem;"
          @change="updateDate"
        >
          <option value="">Sélectionner...</option>
          <option value="JAN">Janvier</option>
          <option value="FEV">Février</option>
          <option value="MAR">Mars</option>
          <option value="AVR">Avril</option>
          <option value="MAI">Mai</option>
          <option value="JUN">Juin</option>
          <option value="JUL">Juillet</option>
          <option value="AOU">Août</option>
          <option value="SEP">Septembre</option>
          <option value="OCT">Octobre</option>
          <option value="NOV">Novembre</option>
          <option value="DEC">Décembre</option>
        </select>
        <div v-if="errors.mois" class="text-red-500 text-sm mt-1">
          {{ errors.mois }}
        </div>
      </div>
      
      <div class="flex-1 mb-4">
        <label :for="`${id}-annee`" class="block text-sm font-normal mb-1">Année <span v-if="required" class="text-red-500">*</span></label>
        <input 
          :id="`${id}-annee`" 
          v-model="localDate.annee" 
          type="text" 
          :required="required" 
          placeholder="Ex: 2025"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500 bg-red-50': errors.annee }"
          @input="updateDate"
        >
        <div v-if="errors.annee" class="text-red-500 text-sm mt-1">
          {{ errors.annee }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DateGroup',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: 'Date'
    },
    modelValue: {
      type: Object,
      default: () => ({
        jour: '',
        mois: '',
        annee: ''
      })
    },
    required: {
      type: Boolean,
      default: true
    },
    errors: {
      type: Object,
      default: () => ({
        jour: '',
        mois: '',
        annee: ''
      })
    }
  },
  data() {
    return {
      localDate: { ...this.modelValue }
    };
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.localDate = { ...newValue };
      },
      deep: true
    }
  },
  methods: {
    updateDate() {
      this.$emit('update:modelValue', { ...this.localDate });
    }
  }
};
</script>

