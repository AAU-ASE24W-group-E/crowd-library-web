import { defineStore } from 'pinia'
import { featureCollection } from '@turf/helpers'
import type { FeatureCollection } from 'geojson'
import { ref } from 'vue'

// stores all requested features for sibling communication between sidebar and map
export const usePoiMapFeatureStore = defineStore('poi-features', () => {
  let pois =  ref<FeatureCollection>(featureCollection([]))

  function setPOIs(new_pois:FeatureCollection) {
    pois.value = new_pois
  }

  function getPOIs() {
    return pois.value
  }

  return {
    setPOIs,
    getPOIs,
    pois
  }
})