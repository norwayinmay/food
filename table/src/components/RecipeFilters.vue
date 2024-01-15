<script setup>
import { useFiltersStore } from '@/stores/filters'
import { DIET_TYPES } from '@/dataFields'

const filtersStore = useFiltersStore()
</script>

<template>
  <div class="filters">
    <div class="box-border w-72 bg-teal-200 bg-opacity-100 rounded">
      <div>Limit to:</div>
      <div>
        <template v-for="dietType in DIET_TYPES" :key="dietType.id">
          <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
              class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              :id="dietType.id"
              :value="dietType.dataValue"
              v-model="filtersStore.selectedDietTypes"
            />
            <label
              class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              :for="dietType.id"
              >{{ dietType.displayName }}</label
            >
          </div>
        </template>
      </div>
    </div>
    <div class="box-content h-12 w-fit bg-blue-200 bg-opacity-100 rounded">
      <form
        class="inline-block align-middle border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        id="search"
      >
        Search
        <input name="query" v-model="filtersStore.searchQuery" />
      </form>
    </div>
  </div>
</template>

<style scoped>
div {
  font-family: 'Orbitron';
}

.filters {
  display: flex;
}
</style>
