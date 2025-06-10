<template>
  <div class="table-container">
    <table class="table">
      <thead class="table-header">
        <tr>
          <th class="table-header-cell w-1/2">Titre & Lieu</th>
          <th class="table-header-cell w-1/3">Date & Horaire</th>
          <th class="table-header-cell text-right w-24">Actions</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="event in events" :key="event.id" class="table-row">
          <td class="table-cell">
            <div class="flex flex-col">
              <span class="font-semibold text-primary truncate">{{ event.titre }}</span>
              <span class="text-xs text-gray-500 mt-1 truncate">
                <i class="fas fa-map-marker-alt mr-1"></i> {{ event.lieu || 'Aucun lieu' }}
              </span>
            </div>
          </td>
          <td class="table-cell">
            <div class="flex flex-col">
              <span><i class="far fa-calendar-alt mr-1"></i> {{ formatDate(event.date) }}</span>
              <span class="text-xs text-gray-500 mt-1">
                <i class="far fa-clock mr-1"></i> {{ event.horaire || 'Horaire non précisé' }}
              </span>
            </div>
          </td>
          <td class="table-cell text-right">
            <div class="flex justify-end">
              <button @click="$emit('view', event.id)" class="w-8 h-8 rounded-md flex items-center justify-center bg-gray-100 border-none mr-1 text-gray-600 cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white" title="Voir les détails">
                <i class="fas fa-eye"></i>
              </button>
              <button @click="$emit('edit', event.id)" class="w-8 h-8 rounded-md flex items-center justify-center bg-gray-100 border-none mr-1 text-gray-600 cursor-pointer transition-all duration-200 hover:bg-secondary hover:text-white" title="Modifier">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="$emit('delete', event)" class="w-8 h-8 rounded-md flex items-center justify-center bg-gray-100 border-none text-gray-600 cursor-pointer transition-all duration-200 hover:bg-danger hover:text-white" title="Supprimer">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'EventTable',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return 'Date inconnue';
      return `${date.jour} ${date.mois} ${date.annee}`;
    }
  }
};
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: visible;
}

.table {
  table-layout: fixed;
  width: 100%;
}

.truncate {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 640px) {
  .table-container {
    overflow-x: auto;
  }
  
  .table {
    min-width: 500px;
  }
}
</style>

