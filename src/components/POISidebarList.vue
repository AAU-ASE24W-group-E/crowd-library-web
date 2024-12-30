<script>
import POISidebarItem from '@/components/POISidebarItem.vue'
import { usePoiMapFeatureStore } from '@/stores/poiMapFeatures'
import { ref, watch, reactive } from 'vue'

export default {
    props: ['poi_info'],
    components: {
        POISidebarItem,
    },
    emits: ['item-clicked'],
    methods: {
      itemClicked(feature) {
        this.$emit('item-clicked', feature);
      },
    },
    setup(props) {
        const poiMapFeatureStore = usePoiMapFeatureStore()
        const featureList = reactive([])
        const title_pois = 'Points of Interest'
        const listCount = ref(0)

        const setFeatureList = (newFeatures) => {
          let sorted = newFeatures.features.sort((a, b) =>{
            return a.properties.type.localeCompare(b.properties.type)
          });
          listCount.value = sorted.length
          featureList.features = sorted
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
          featureList,
          listCount
        }
    },
}
</script>

<template>
    <div class="tw-heading-2 mb-5 mt-2">{{ title_pois }} [{{ listCount }}]</div>
  <div
    class="overflow-y-auto h-[70%] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
  > 
    <POISidebarItem class="mb-4 mr-4" @item-clicked="itemClicked"
      v-for="feature in featureList.features" :key="feature.properties.id"
      :feature="feature"
      :poi_info="poi_info"
    />
  </div>
</template>
