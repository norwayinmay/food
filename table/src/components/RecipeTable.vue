<script setup>
import { ref, computed } from 'vue'
import * as dataProcessing from '@/dataProcessing'

function ColumnHeader(dataField, displayName, sortType) {
  this.dataField = dataField
  this.displayName = displayName
  this.sortType = sortType
}

const columnHeaders = [
  new ColumnHeader(dataProcessing.NAME_FIELD, 'Name', dataProcessing.SortType.TEXT),
  new ColumnHeader('portions', 'Portions', dataProcessing.SortType.TEXT),
  new ColumnHeader('time', 'Time (min)', dataProcessing.SortType.NUMBER),
  new ColumnHeader('fibre', 'Fibre (g/portion)', dataProcessing.SortType.NUMBER)
]

const props = defineProps({
  data: Array,
  searchQuery: String,
  dietaryRequirements: Array
})

const sortColumn = ref(new ColumnHeader('', ''))
const sortOrders = ref(columnHeaders.reduce((o, key) => ((o[key] = 1), o), {}))

const filteredData = computed(() => {
  let { data, searchQuery, dietaryRequirements } = props

  if (dietaryRequirements.length > 0) {
    data = dataProcessing.matchesDiet(data, dietaryRequirements)
  }

  if (searchQuery) {
    data = dataProcessing.matchAnyField(data, searchQuery)
  }

  if (sortColumn.value) {
    data = dataProcessing.sortByColumn(data, sortOrders, sortColumn.value)
  }
  return data
})

function toggleColumnSort(col) {
  sortColumn.value = col
  sortOrders.value[col] *= -1
}
</script>

<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <th
          v-for="col in columnHeaders"
          :key="col.dataField"
          @click="toggleColumnSort(col)"
          :class="{ active: sortColumn == col }"
        >
          {{ col.displayName }}
          <span class="arrow" :class="sortOrders[col] > 0 ? 'asc' : 'dsc'"> </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in filteredData" :key="recipe">
        <td v-for="col in columnHeaders" :key="col.dataField">
          <div v-if="col.dataField === dataProcessing.NAME_FIELD">
            <a :href="recipe[dataProcessing.LINK_FIELD]">{{ recipe[dataProcessing.NAME_FIELD] }}</a>
          </div>
          <div v-else>{{ recipe[col.dataField] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>

<style>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
