<script setup>
import data from './assets/data.json'
import RecipeTable from './components/RecipeTable.vue'
import DietTypes from '@/components/DietTypes.vue'
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<template>
  <DietTypes> </DietTypes>

  <form id="search">Search <input name="query" v-model="searchQuery" /></form>

  <RecipeTable :data="data" :search-query="searchQuery"> </RecipeTable>
</template>
