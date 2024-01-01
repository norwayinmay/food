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

export const NAME = new Field('name', FilterType.TEXT)
export const PORTIONS = new Field('portions', FilterType.TEXT)
export const TIME = new Field('time', FilterType.NUMBER)
export const LINK = new Field('link', FilterType.NONE)
export const DIET = new Field('diet', FilterType.TEXT)
export const FIBRE = new Field('fibre', FilterType.NUMBER)
export const PROTEIN = new Field('protein', FilterType.NUMBER)
export const KEYWORDS = new Field('keywords', FilterType.TEXT)

export const ALL = [
  NAME,
  PORTIONS,
  TIME,
  LINK,
  DIET,
  FIBRE,
  PROTEIN,
  KEYWORDS
]


export class DietType {
  constructor(id, displayName, dataValue) {
    this.id = id
    this.displayName = displayName
    this.dataValue = dataValue
  }
}

// Possible values of the 'diet' array field
export const DIET_TYPES = [
  new DietType('v', 'Vegetarian', 'V'),
  new DietType('vg', 'Vegan', 'VG'),
  new DietType('gf', 'Gluten-free (use GF stocks etc.)', 'GF'),
  new DietType('sweet', 'Sweet', 'sweet'),
  new DietType('savoury', 'Savoury', 'savoury')
]
