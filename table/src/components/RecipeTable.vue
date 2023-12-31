<script setup>
import { ref, computed } from 'vue'
import * as dataProcessing from '@/dataProcessing'
import { useFiltersStore } from '@/stores/filters'

const props = defineProps({
  data: Array,
  searchQuery: String
})

const filtersStore = useFiltersStore()

class ColumnHeader {
  constructor(dataField, displayName, sortType) {
    this.dataField = dataField
    this.displayName = displayName
    this.sortType = sortType
  }
}

const NAME_FIELD = 'name'
const LINK_FIELD = 'link'
const DIET_FIELD = 'diet'

const DEFAULT_COLUMN_HEADERS = [
  new ColumnHeader(NAME_FIELD, 'Name', dataProcessing.SortType.TEXT),
  new ColumnHeader('portions', 'Portions', dataProcessing.SortType.TEXT),
  new ColumnHeader('time', 'Time (min)', dataProcessing.SortType.NUMBER),
  new ColumnHeader('fibre', 'Fibre (g/portion)', dataProcessing.SortType.NUMBER)
]

const ALL_COLUMN_HEADERS = [
  ...DEFAULT_COLUMN_HEADERS,
  new ColumnHeader('protein', 'Protein (g/portion)', dataProcessing.SortType.NUMBER),
  new ColumnHeader(DIET_FIELD, 'Diet type', dataProcessing.SortType.TEXT),
  new ColumnHeader('keywords', 'Keywords', dataProcessing.SortType.TEXT)
]

const allColumns = ref(false)
const columnHeaders = computed(() => {
  return allColumns.value ? ALL_COLUMN_HEADERS : DEFAULT_COLUMN_HEADERS
})

const SORT_ASC = 1
const sortColumn = ref(new ColumnHeader('', ''))
const sortOrders = ref(
  ALL_COLUMN_HEADERS.map((col) => col.dataField).reduce(
    (initialSortOrders, dataField) => (
      (initialSortOrders[dataField] = SORT_ASC), initialSortOrders
    ),
    {}
  )
)

const filteredData = computed(() => {
  let { data, searchQuery } = props

  if (filtersStore.dietTypes.length > 0) {
    data = dataProcessing.matchesListField(data, DIET_FIELD, filtersStore.dietTypes)
  }

  if (searchQuery) {
    data = dataProcessing.matchesAnyField(data, searchQuery)
  }

  if (sortColumn.value) {
    data = dataProcessing.sortByColumn(data, sortOrders.value, sortColumn.value)
  }

  return data
})

function toggleColumnSort(col) {
  sortColumn.value = col
  sortOrders.value[col.dataField] *= -1
}
</script>

<template>
  <input type="checkbox" id="allCols" v-model="allColumns" />
  <label for="allCols">Show all columns</label>

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
          <span class="arrow" :class="sortOrders[col.dataField] === SORT_ASC ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in filteredData" :key="recipe">
        <td v-for="col in columnHeaders" :key="col.dataField">
          <div v-if="col.dataField === NAME_FIELD">
            <a :href="recipe[LINK_FIELD]">{{ recipe[NAME_FIELD] }}</a>
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
