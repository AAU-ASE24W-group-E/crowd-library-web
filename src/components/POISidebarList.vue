<script>
import POISidebarItem from '@/components/POISidebarItem.vue'
import { usePoiMapFeatureStore } from '@/stores/poiMapFeatures'
import { ref, watch, computed } from 'vue'
import { featureCollection } from '@turf/helpers'

export default {
    props: ['poi_info'],
    components: {
        POISidebarItem,
    },
    setup(props) {
        const poiMapFeatureStore = usePoiMapFeatureStore()
        const featureList = ref([])
        const title_pois = 'Points of Interest'

        const setFeatureList = (newFeatures) => {
        featureList.value = newFeatures
        }

        watch(
        () => poiMapFeatureStore.pois,
        (newPois) => {
            setFeatureList(newPois) // Update featureList when pois change
        },
        { deep: true },
        )

        return {
        setFeatureList,
        poiMapFeatureStore,
        title_pois,
        featureList
        }
    },
}
</script>

<template>
    <div class="tw-heading-2 mb-5 mt-2">{{ title_pois }}</div>
  <div
    class="overflow-y-auto h-[70%] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
  >
    <POISidebarItem class="mb-4 mr-4"
      v-for="(feature, index) in featureList.features"
      :title="feature.properties.name"
      :type="feature.properties.type"
      :poi_info="poi_info"
    />
  </div>
</template>
