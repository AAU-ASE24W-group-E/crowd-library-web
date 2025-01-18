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
      this.$emit('item-clicked', feature)
    },
  },
  setup(props) {
    const poiMapFeatureStore = usePoiMapFeatureStore()
    const featureList = reactive([])
    const title_pois = 'Points of Interest'
    const listCount = ref(0)

    const setFeatureList = (newFeatures) => {
      let sorted = newFeatures.features.sort((a, b) => {
        return a.properties.type.localeCompare(b.properties.type)
      })
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
      listCount,
    }
  },
}
</script>

<template>
  <div class="h-[50vh] max-h-[50vh] overflow-hidden">
    <div class="sidebar-list-title tw-heading-2  sidebar-item-count">{{ title_pois }} [{{ listCount }}]</div>
    <div
      class="sidebar-list-scrollbar  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      <POISidebarItem
        class="mr-4 ml-4 mb-2 mt-2 overflow-hidden"
        @item-clicked="itemClicked"
        v-for="feature in featureList.features"
        :key="feature.properties.id"
        :feature="feature"
        :poi_info="poi_info"
      />
    </div>
  </div>
</template>

<style scoped>
  .sidebar-list-scrollbar{
    @apply rounded-lg bg-gray-200 overflow-y-auto h-[40vh] max-h-[40vh] max-sm:h-[200px] max-sm:max-h-[200px]
    dark:text-title-dark-mode-text dark:bg-gray-800;
  }

  .sidebar-list-title{
    @apply
    text-[1.5em] mb-5 mt-2;
  }


</style>
