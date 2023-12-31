<script setup>
import { useFiltersStore } from '@/stores/filters'

const filtersStore = useFiltersStore()

class DietType {
  constructor(id, displayName, dataField) {
    this.id = id
    this.displayName = displayName
    this.dataField = dataField
  }
}

const DIET_TYPES = [
  new DietType('v', 'Vegetarian', 'V'),
  new DietType('vg', 'Vegan', 'VG'),
  new DietType('gf', 'Gluten-free (use GF stocks etc.)', 'GF'),
  new DietType('sweet', 'Sweet', 'sweet'),
  new DietType('savoury', 'Savoury', 'savoury')
]
</script>

<template>
  <div>Diet types</div>
  <div>
    <template v-for="dietType in DIET_TYPES" :key="dietType.id">
      <div>
        <input
          type="checkbox"
          :id="dietType.id"
          :value="dietType.dataField"
          v-model="filtersStore.dietTypes"
        />
        <label :for="dietType.id">{{ dietType.displayName }}</label>
      </div>
    </template>
  </div>
</template>
