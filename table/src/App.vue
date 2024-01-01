<script setup>
import data from './assets/data.json'
import RecipeTable from './components/RecipeTable.vue'
import Filters from '@/components/Filters.vue'
</script>

<template>
  <Filters> </Filters>

  <RecipeTable :data="data"> </RecipeTable>
</template>
