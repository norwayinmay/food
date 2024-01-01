<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useFiltersStore } from '@/stores/filters'
import { DIET_TYPES } from '@/dataFields'

const filtersStore = useFiltersStore()
</script>

<template>
  <div>Diet types</div>
  <div>
    <template v-for="dietType in DIET_TYPES" :key="dietType.id">
      <div>
        <input
          type="checkbox"
          :id="dietType.id"
          :value="dietType.dataValue"
          v-model="filtersStore.selectedDietTypes"
        />
        <label :for="dietType.id">{{ dietType.displayName }}</label>
      </div>
    </template>
  </div>

  <form id="search">Search <input name="query" v-model="filtersStore.searchQuery" /></form>
</template>
