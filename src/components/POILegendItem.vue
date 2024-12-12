<template>
  <div class="poi-legend-item">
    <Toggle v-model="isToggled" />
    <h3 class="poi-legend-title" :style="{ color: colors[type] }">{{ title }}</h3>
  </div>
</template>

<script>
// Import the ToggleButton component
import Toggle from '@vueform/toggle'
import colors from '@/assets/color'

export default {
  components: {
    Toggle,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      colors,
      isToggled: false, // Track the toggle state
    };
  }
};
</script>

<style scoped>
.poi-legend-item {
  @apply p-1 pl-2 hover:bg-gray-100 cursor-pointer flex items-center;
}

.poi-legend-title {
  @apply text-lg font-semibold text-gray-800;
}
</style>
