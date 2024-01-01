import { ref } from 'vue'
import { defineStore } from 'pinia'

import * as dataProcessing from '@/dataProcessing'

export const useFiltersStore = defineStore('filters', () => {
  const dietTypes = ref([])
  const searchQuery = ref('')

  function filterData(originalData, sortColumn, sortOrders) {
    let data = originalData.slice()

    if (this.dietTypes.length > 0) {
      data = dataProcessing.matchesListField(data, dataProcessing.DIET_FIELD, dietTypes.value)
    }

    if (this.searchQuery) {
      data = dataProcessing.matchesAnyField(data, searchQuery.value)
    }

    if (sortColumn) {
      data = dataProcessing.sortByColumn(data, sortOrders, sortColumn)
    }

    return data
  }

  return { dietTypes, searchQuery, filterData }
})
