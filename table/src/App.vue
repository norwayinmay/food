<script setup>
import data from './assets/data.json'
import RecipeTable from './components/RecipeTable.vue'
import { ref } from 'vue'
import {DIET_TYPES} from '@/dataProcessing'

const searchQuery = ref('')
const dietTypes = ref([])

</script>

<template>
  <div>Diet types</div>
  <div>
    <template v-for="dietType in DIET_TYPES" :key="dietType.id">
      <div>
        <input type="checkbox" :id=dietType.id :value=dietType.dataField v-model="dietTypes" />
        <label :for=dietType.id>{{ dietType.displayName }}</label>
      </div>
    </template>
  </div>

  <form id="search">Search <input name="query" v-model="searchQuery" /></form>

  <RecipeTable :data="data" :search-query="searchQuery" :diet-types="dietTypes"> </RecipeTable>
</template>
