
export class DietType {
  constructor(id, displayName, dataField) {
    this.id = id
    this.displayName = displayName
    this.dataField = dataField
  }
}

export const DIET_TYPES = [
  new DietType('v', 'Vegetarian', 'V'),
  new DietType('vg', 'Vegan', 'VG'),
  new DietType('gf', 'Gluten-free (use GF stocks etc.)', 'GF'),
  new DietType('sweet', 'Sweet', 'sweet'),
  new DietType('savoury', 'Savoury', 'savoury')
]

export const SortType = Object.freeze({
  TEXT: Symbol('text-sort'),
  NUMBER: Symbol('number-sort')
})

export function matchesListField(data, listField, requiredMatches) {
console.log(requiredMatches)

  return data.filter((row) => {
    if (row[listField]) {
      return requiredMatches.every((dr) => row[listField].indexOf(dr) > -1)
    }
    return false
  })
}

export function matchesAnyField(data, searchQuery) {
  const query = searchQuery.toLowerCase()
  return data.filter((row) => {
    return Object.keys(row).some((dataField) => {
      return String(row[dataField]).toLowerCase().indexOf(query) > -1
    })
  })
}

export function sortByColumn(data, sortOrders, sortColumn) {
  const order = sortOrders[sortColumn.dataField]

  return data.slice().sort((rowA, rowB) => {
    let a = normaliseValueForSort(rowA, sortColumn)
    let b = normaliseValueForSort(rowB, sortColumn)
    return (a === b ? 0 : a > b ? 1 : -1) * order
  })
}

function normaliseValueForSort(row, sortColumn) {
  let value = row[sortColumn.dataField]
  if (sortColumn.sortType === SortType.NUMBER) {
    if (!value) {
      value = 0
    }
  }

  return value
}
