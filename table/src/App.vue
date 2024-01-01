<script setup>
import recipeData from './assets/recipeData.json'
import RecipeTable from './components/RecipeTable.vue'
import Filters from '@/components/Filters.vue'
</script>

<template>
  <Filters> </Filters>

  <RecipeTable :recipe-data="recipeData"> </RecipeTable>
</template>
