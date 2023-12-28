<script setup>
import data from './assets/data.json'
import RecipeTable from './components/RecipeTable.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const dietaryRequirements = ref([])
</script>

<template>
  <input type="checkbox" id="v" value="V" v-model="dietaryRequirements" />
  <label for="v">Vegetarian</label>

  <input type="checkbox" id="vg" value="VG" v-model="dietaryRequirements" />
  <label for="vg">Vegan</label>

  <input type="checkbox" id="gf" value="GF" v-model="dietaryRequirements" />
  <label for="gf">Gluten-free (use GF stocks etc.)</label>

  <form id="search">Search <input name="query" v-model="searchQuery" /></form>

  <RecipeTable :data="data" :search-query="searchQuery" :dietary-requirements="dietaryRequirements">
  </RecipeTable>
</template>
