<script setup>
import recipeData from './assets/recipeData.json'
import RecipeTable from './components/RecipeTable.vue'
import RecipeFilters from '@/components/RecipeFilters.vue'
</script>

<template>
  <RecipeFilters> </RecipeFilters>

  <RecipeTable :recipe-data="recipeData"> </RecipeTable>
</template>
<style>

div {
  font-family: "ChunkFive";
}

</style>