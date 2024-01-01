// This file contains definitions of the fields that appear in the data.json file of recipe data.

export const FilterType = Object.freeze({
  TEXT: Symbol('text-sort'),
  NUMBER: Symbol('number-sort'),
  NONE: Symbol('no-sort')
})

export class Field {
  constructor(fieldName, filterType) {
    this.fieldName = fieldName
    this.filterType = filterType
  }
}

export const NAME_FIELD = new Field('name', FilterType.TEXT)
export const PORTIONS_FIELD = new Field('portions', FilterType.TEXT)
export const TIME_FIELD = new Field('time', FilterType.NUMBER)
export const LINK_FIELD = new Field('link', FilterType.NONE)
export const DIET_FIELD = new Field('diet', FilterType.TEXT)
export const FIBRE_FIELD = new Field('fibre', FilterType.NUMBER)
export const PROTEIN_FIELD = new Field('protein', FilterType.NUMBER)
export const KEYWORDS_FIELD = new Field('keywords', FilterType.TEXT)

export const ALL_FIELDS = [
  NAME_FIELD,
  PORTIONS_FIELD,
  TIME_FIELD,
  LINK_FIELD,
  DIET_FIELD,
  FIBRE_FIELD,
  PROTEIN_FIELD,
  KEYWORDS_FIELD
]
export const FIELDS_BY_NAME = new Map()
ALL_FIELDS.forEach((field) => {
  FIELDS_BY_NAME.set(field.fieldName, field)
})

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
