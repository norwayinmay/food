<script setup>
import { ref, computed } from 'vue'

function ColumnHeader(dataField, displayName) {
  this.dataField = dataField
  this.displayName = displayName
}

const columnHeaders = [
  new ColumnHeader('name', 'Name'),
  new ColumnHeader('portions', 'Portions'),
  new ColumnHeader('time', 'Time (min)'),
  new ColumnHeader('fibre', 'Fibre (g/portion)')
]

const props = defineProps({
  data: Array,
  searchQuery: String
})

const sortCol = ref(new ColumnHeader('', ''))
const sortOrders = ref(columnHeaders.reduce((o, key) => ((o[key] = 1), o), {}))

const filteredData = computed(() => {
  let { data, searchQuery } = props
  if (searchQuery) {
    searchQuery = searchQuery.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((dataField) => {
        return String(row[dataField]).toLowerCase().indexOf(searchQuery) > -1
      })
    })
  }

  const sortColumn = sortCol.value
  if (sortColumn) {
    const order = sortOrders.value[sortColumn]
    data = data.slice().sort((a, b) => {
      a = a[sortColumn.dataField]
      b = b[sortColumn.dataField]
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

function toggleColSort(col) {
  sortCol.value = col
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
          @click="toggleColSort(col)"
          :class="{ active: sortCol == col }"
        >
          {{ col.displayName }}
          <span class="arrow" :class="sortOrders[col] > 0 ? 'asc' : 'dsc'"> </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="recipe in filteredData" :key="recipe">
        <td v-for="col in columnHeaders" :key="col.dataField">
          <div v-if="col.dataField === 'name'">
            <a :href="recipe['link']">{{ recipe['name'] }}</a>
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
