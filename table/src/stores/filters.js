import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', () => {
  const dietTypes = ref([])

  return { dietTypes }
})
