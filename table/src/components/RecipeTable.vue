<script setup>
import { ref, computed } from 'vue'
import * as dataUtils from '@/dataUtils'
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()

const props = defineProps({
  data: Array
})

class Column {
  constructor(dataField, label) {
    this.id = dataField.fieldName
    this.dataField = dataField
    this.label = label
  }
}

const DEFAULT_COLUMNS = [
  new Column(dataUtils.NAME_FIELD, 'Name'),
  new Column(dataUtils.PORTIONS_FIELD, 'Portions'),
  new Column(dataUtils.TIME_FIELD, 'Time (min)'),
  new Column(dataUtils.FIBRE_FIELD, 'Fibre (g/portion)')
]

const ALL_COLUMNS = [
  ...DEFAULT_COLUMNS,
  new Column(dataUtils.PROTEIN_FIELD, 'Protein (g/portion)'),
  new Column(dataUtils.DIET_FIELD, 'Diet type'),
  new Column(dataUtils.KEYWORDS_FIELD, 'Keywords')
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

const filteredData = computed(() => {
  return filtersStore.filterData(props.data, sortColumn.value.dataField)
})
</script>

<template>
  <input type="checkbox" id="allCols" v-model="showAllColumns" />
  <label for="allCols">Show all columns</label>

  <table v-if="filteredData.length">
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
      <tr v-for="recipe in filteredData" :key="recipe">
        <td v-for="col in columns" :key="col.id">
          <div v-if="col.dataField === dataUtils.NAME_FIELD">
            <a :href="recipe[dataUtils.LINK_FIELD.fieldName]">{{
              recipe[dataUtils.NAME_FIELD.fieldName]
            }}</a>
          </div>
          <div v-else>{{ recipe[col.dataField.fieldName] }}</div>
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
