<template>
  <div class="flex justify-between items-center mb-6">
    <div class="relative flex-1 max-w-md">
      <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      <input 
        type="text" 
        :value="searchQuery"
        @input="$emit('search', $event.target.value)" 
        placeholder="Rechercher un événement..." 
        class="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
    
    <div class="flex gap-2">
      <button 
        :class="[
          'w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-pointer transition-all duration-200',
          viewMode === 'grid' ? 'bg-primary text-white border-primary' : 'hover:bg-gray-200'
        ]" 
        @click="$emit('view-mode-change', 'grid')"
        title="Vue en grille"
      >
        <i class="fas fa-th-large"></i>
      </button>
      <button 
        :class="[
          'w-10 h-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-pointer transition-all duration-200',
          viewMode === 'list' ? 'bg-primary text-white border-primary' : 'hover:bg-gray-200'
        ]" 
        @click="$emit('view-mode-change', 'list')"
        title="Vue en liste"
      >
        <i class="fas fa-list"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchAndFilter',
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    viewMode: {
      type: String,
      required: true,
      validator: value => ['grid', 'list'].includes(value)
    }
  }
};
</script>

