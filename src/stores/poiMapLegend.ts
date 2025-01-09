import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TypeState {
    [key: string]: boolean
}

export const useMapLegendStore = defineStore('map-legend', () => {
  const typeStates = ref<TypeState>({})

  function toggleTypeState(type:string) {
    typeStates.value[type] = !typeStates.value[type]
  }

  const getTypeState = (type: string): boolean => {
    return typeStates.value[type]
  }

  function getActiveTypes(newTypes:any) {
    let active_types:string[] = []
    Object.keys(newTypes).forEach(key => {
        if(typeStates.value[key]){
            active_types.push(key);
        }
    });
    return active_types;
  }

  return { 
    toggleTypeState: toggleTypeState,
    getTypeState: getTypeState,
    typeStates: typeStates,
    getActiveTypes: getActiveTypes
  }
})