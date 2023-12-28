export const NAME_FIELD = 'name'
export const LINK_FIELD = 'link'
export const DIET_FIELD = 'diet'

export const SortType = Object.freeze({
  TEXT: Symbol('text-sort'),
  NUMBER: Symbol('number-sort')
})

export function matchesDiet(data, dietaryRequirements) {
  return data.filter((row) => {
    if (row[DIET_FIELD]) {
      return dietaryRequirements.every((dr) => row[DIET_FIELD].indexOf(dr) > -1)
    }
    return false
  })
}

export function matchAnyField(data, searchQuery) {
  const query = searchQuery.toLowerCase()
  return data.filter((row) => {
    return Object.keys(row).some((dataField) => {
      return String(row[dataField]).toLowerCase().indexOf(query) > -1
    })
  })
}

export function sortByColumn(data, sortOrders, sortColumn) {
  console.log(sortColumn)
  const order = sortOrders.value[sortColumn]
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
