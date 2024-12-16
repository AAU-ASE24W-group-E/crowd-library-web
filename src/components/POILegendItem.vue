<template>
  <div class="poi-legend-item">
    <VueToggles
      :value="isActive"
      :height="25"
      :width="60"
      checkedText="On"
      uncheckedText="Off"
      :checkedBg= "colors[type]"
      uncheckedBg="lightgrey"
      @click="toggleActive"
    />
    <h3 class="poi-legend-label" :style="{ color: colors[type] }">{{ title }}</h3>
  </div>
</template>

<script>
// Import the ToggleButton component
import { VueToggles } from "vue-toggles";
import colors from '@/assets/color'

export default {
  components:{
    VueToggles,
  },
  props: {
    modelValue: Boolean,
    onLabel: {
      type: String,
      default: 'On',
    },
    offLabel: {
      type: String,
      default: 'Off',
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colors,
      isActive: true,
    }
  },
  methods: {
    toggleActive() {
      this.isActive = !this.isActive;
      this.$emit('toggle_changed', this.isActive);
    }
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
