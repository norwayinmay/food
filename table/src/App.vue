<script setup>
import data from './assets/data.json'
import RecipeTable from './components/RecipeTable.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const gridData = data
</script>

<template>
  <form id="search">Search <input name="query" v-model="searchQuery" /></form>
  <RecipeTable :data="gridData" :search-query="searchQuery"> </RecipeTable>
</template>
