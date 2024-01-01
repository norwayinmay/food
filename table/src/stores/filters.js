import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as dataUtils from '@/dataUtils'

// These constants match the classes used in styling column sort indicators.
export const SORT_ASC = 'asc'
export const SORT_DESC = 'dsc'

function matchesListField(data, listField, requiredMatches) {
  return data.filter((row) => {
    if (row[listField.fieldName]) {
      return requiredMatches.every(
        (requiredMatch) => row[listField.fieldName].indexOf(requiredMatch) > -1
      )
    }
    return false
  })
}

function matchesAnyField(data, searchQuery) {
  const query = searchQuery.toLowerCase()
  return data.filter((row) => {
    return Object.keys(row).some((field) => {
      console.log(String(row[field]).toLowerCase())
      return String(row[field]).toLowerCase().indexOf(query) > -1
    })
  })
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
  if (sortField.sortType === dataUtils.SortType.NUMBER) {
    if (!value) {
      value = 0
    }
  }

  return value
}

export const useFiltersStore = defineStore('filters', () => {
  const dietTypes = ref([])
  const searchQuery = ref('')
  const allSortOrders = ref([])

  function initialiseSortOrders(columns) {
    allSortOrders.value = columns
      .map((col) => col.id)
      .reduce(
        (initialSortOrders, colId) => ((initialSortOrders[colId] = SORT_ASC), initialSortOrders),
        {}
      )
  }

  function toggleSortOrder(column) {
    const existingOrder = allSortOrders.value[column.id]
    allSortOrders.value[column.id] = existingOrder === SORT_ASC ? SORT_DESC : SORT_ASC
  }

  function filterData(originalData, sortField) {
    let data = originalData.slice()

    if (this.dietTypes.length > 0) {
      data = matchesListField(data, dataUtils.DIET_FIELD, dietTypes.value)
    }

    if (this.searchQuery) {
      data = matchesAnyField(data, searchQuery.value)
    }

    if (sortField && sortField.sortType !== dataUtils.SortType.NONE) {
      data = sortByColumn(data, allSortOrders.value, sortField)
    }

    return data
  }

  return {
    dietTypes,
    searchQuery,
    allSortOrders,
    initialiseSortOrders,
    toggleSortOrder,
    filterData
  }
})
