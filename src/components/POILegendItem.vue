<template>
  <div class="poi-legend-item">
    <VueToggles
      :value="mapLegendStore.getTypeState(type)"
      :height="25"
      :width="60"
      checkedText="On"
      uncheckedText="Off"
      :checkedBg= "color"
      uncheckedBg="lightgrey"
      @click="handleToggle"
    />
    <h3 class="poi-legend-label" :style="{ color: color }">{{ title }}</h3>
  </div>
</template>

<script>
import  VueToggles  from "vue-toggles";
import { useMapLegendStore } from '@/stores/poiMapLegend'

export default {
  components:{
    VueToggles,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const mapLegendStore = useMapLegendStore();

    const handleToggle = () => {
      mapLegendStore.toggleTypeState(props.type);
    };

    // default toggle true (on)
    handleToggle()

    return {
      mapLegendStore,
      handleToggle
    };
  }
}
</script>

<style scoped>

.poi-legend-item {
  @apply p-1 pl-2 hover:bg-gray-100 cursor-pointer flex items-center;
}

.poi-legend-label {
  @apply text-lg font-semibold text-gray-800 pl-2;
}
</style>
