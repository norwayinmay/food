<script setup>
import { ref, computed } from 'vue'
import * as dataFields from '@/dataFields'
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()

const props = defineProps({
  recipeData: Array
})

class Column {
  constructor(dataField, label) {
    this.id = dataField.fieldName
    this.dataField = dataField
    this.label = label
  }
}

const DEFAULT_COLUMNS = [
  new Column(dataFields.NAME, 'Name'),
  new Column(dataFields.PORTIONS, 'Portions'),
  new Column(dataFields.TIME, 'Time (min)'),
  new Column(dataFields.FIBRE, 'Fibre (g/portion)')
]

const ALL_COLUMNS = [
  ...DEFAULT_COLUMNS,
  new Column(dataFields.PROTEIN, 'Protein (g/portion)'),
  new Column(dataFields.DIET, 'Diet type'),
  new Column(dataFields.KEYWORDS, 'Keywords')
]

const showAllColumns = ref(false)
const columns = computed(() => {
  return showAllColumns.value ? ALL_COLUMNS : DEFAULT_COLUMNS
})

const sortColumn = ref(new Column('', ''))
filtersStore.initialiseSortOrders(ALL_COLUMNS)

function toggleColumnSort(col) {
  sortColumn.value = col
  filtersStore.toggleSortOrder(col)
}

const matchingRecipes = computed(() => {
  return filtersStore.filterData(props.recipeData, sortColumn.value.dataField)
})
</script>

<template>
  <div
    class="flex items-center ps-4 border w-72 bg-yellow-200 bg-opacity-100 rounded border-gray-200 rounded dark:border-gray-700"
  >
    <input
      class="w-6 h-6 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      type="checkbox"
      id="allCols"
      v-model="showAllColumns"
    />
    <label
      class="all-columns w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      for="allCols"
      >Show all columns</label
    >
  </div>

  <table v-if="matchingRecipes.length" class="table-fixed">
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.id"
          @click="toggleColumnSort(col)"
          :class="{ active: sortColumn == col }"
        >
          {{ col.label }}
          <span class="arrow" :class="filtersStore.columnSortOrders[col.id]"> </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in matchingRecipes" :key="recipe">
        <td v-for="col in columns" :key="col.id">
          <div v-if="col.dataField === dataFields.NAME">
            <a :href="recipe[dataFields.LINK.fieldName]">{{ recipe[dataFields.NAME.fieldName] }}</a>
          </div>
          <div v-else>{{ recipe[col.dataField.fieldName] }}</div>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>

<style>
.all-columns {
  font-family: Orbitron;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  font-family: 'Orbitron';
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
