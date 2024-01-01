// This file contains definitions of the fields that appear in the data.json file of recipe data.

export const SortType = Object.freeze({
  TEXT: Symbol('text-sort'),
  NUMBER: Symbol('number-sort'),
  NONE: Symbol('no-sort')
})

export class Field {
  constructor(fieldName, sortType) {
    this.fieldName = fieldName
    this.sortType = sortType
  }
}

export const NAME_FIELD = new Field('name', SortType.TEXT)
export const PORTIONS_FIELD = new Field('portions', SortType.TEXT)
export const TIME_FIELD = new Field('time', SortType.NUMBER)
export const LINK_FIELD = new Field('link', SortType.NONE)
export const DIET_FIELD = new Field('diet', SortType.TEXT)
export const FIBRE_FIELD = new Field('fibre', SortType.NUMBER)
export const PROTEIN_FIELD = new Field('protein', SortType.NUMBER)
export const KEYWORDS_FIELD = new Field('keywords', SortType.TEXT)

export class DietType {
  constructor(id, displayName, dataField) {
    this.id = id
    this.displayName = displayName
    this.dataField = dataField
  }
}

// Possible values of the 'diet' list field
export const DIET_TYPES = [
  new DietType('v', 'Vegetarian', 'V'),
  new DietType('vg', 'Vegan', 'VG'),
  new DietType('gf', 'Gluten-free (use GF stocks etc.)', 'GF'),
  new DietType('sweet', 'Sweet', 'sweet'),
  new DietType('savoury', 'Savoury', 'savoury')
]
