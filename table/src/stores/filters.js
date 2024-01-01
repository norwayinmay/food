import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as dataFields from '@/dataFields'

// These constants match the classes used in styling column sort indicators.
export const SORT_ASC = 'asc'
export const SORT_DESC = 'dsc'

function matchesArrayField(data, listField, requiredMatches) {
  return data.filter((row) => {
    if (row[listField.fieldName]) {
      return requiredMatches.every(
        (requiredMatch) => row[listField.fieldName].indexOf(requiredMatch) > -1
      )
    }
    return false
  })
}

function matchesAnyFilterableField(data, searchQuery) {
  const query = searchQuery.toLowerCase()
  return data.filter((row) => {
    return Object.keys(row).some((fieldName) => fieldContainsQuery(row, fieldName, query))
  })
}

const unfilterableFields = dataFields.ALL.filter(
  (field) => field.filterType === dataFields.FilterType.NONE
).map((field) => field.fieldName)
function fieldContainsQuery(row, fieldName, lowerCaseQuery) {
  if (unfilterableFields.indexOf(fieldName) > -1) {
    return false
  }

  return String(row[fieldName]).toLowerCase().indexOf(lowerCaseQuery) > -1
}

function sortByColumn(data, sortOrders, sortField) {
  return data.slice().sort((rowA, rowB) => {
    let a = normaliseValueForSort(rowA, sortField)
    let b = normaliseValueForSort(rowB, sortField)

    let comparison = a === b ? 0 : a > b ? 1 : -1
    if (sortOrders[sortField.fieldName] === SORT_DESC) {
      comparison = comparison * -1
    }

    return comparison
  })
}

function normaliseValueForSort(row, sortField) {
  let value = row[sortField.fieldName]
  if (value) {
    // no normalisation applied to populated values
    return value
  }

  if (sortField.filterType === dataFields.FilterType.NUMBER) {
    return 0
  }
  if (sortField.filterType === dataFields.FilterType.ARRAY) {
    return []
  }

  // no normalisation applied to other types
  return value
}

export const useFiltersStore = defineStore('filters', () => {
  const selectedDietTypes = ref([])
  const searchQuery = ref('')
  const columnSortOrders = ref([])

  function initialiseSortOrders(columns) {
    columnSortOrders.value = columns
      .map((col) => col.id)
      .reduce(
        (initialSortOrders, colId) => ((initialSortOrders[colId] = SORT_ASC), initialSortOrders),
        {}
      )
  }

  function toggleSortOrder(column) {
    const existingOrder = columnSortOrders.value[column.id]
    columnSortOrders.value[column.id] = existingOrder === SORT_ASC ? SORT_DESC : SORT_ASC
  }

  function filterData(originalData, sortField) {
    let data = originalData.slice()

    if (this.selectedDietTypes.length > 0) {
      data = matchesArrayField(data, dataFields.DIET, selectedDietTypes.value)
    }

    if (this.searchQuery) {
      data = matchesAnyFilterableField(data, searchQuery.value)
    }

    if (sortField && sortField.filterType !== dataFields.FilterType.NONE) {
      data = sortByColumn(data, columnSortOrders.value, sortField)
    }

    return data
  }

  return {
    selectedDietTypes,
    searchQuery,
    columnSortOrders,
    initialiseSortOrders,
    toggleSortOrder,
    filterData
  }
})
