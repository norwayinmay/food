<script setup>
import data from './assets/data.json'
import BasicTable from './components/BasicTable.vue'
import { ref } from 'vue'

const searchQuery = ref('')
const gridColumns = Object.keys(data[0])
const gridData = data
</script>

<template>
  <form id="search">Search <input name="query" v-model="searchQuery" /></form>
  <BasicTable :data="gridData" :columns="gridColumns" :filter-key="searchQuery"> </BasicTable>
</template>
