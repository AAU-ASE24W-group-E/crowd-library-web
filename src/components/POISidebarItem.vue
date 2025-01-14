<template>
  <div class="poi-sidebar-item" @click="itemClicked">
    <h3 class="poi-sidebar-title" :style="{ color: color }">{{ display_title }}</h3>
    <p class="poi-sidebar-description">{{ display_type }}</p>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      required: true
    },
    poi_info: {
      required: true
    }
  },
  emits: ['item-clicked'],
  methods: {
    itemClicked() {
      this.$emit('item-clicked', this.feature);
    },
  },
  setup(props) {
    const type = props.feature.properties.type;
    let display_type = props.poi_info[type]["display_type"];
    let color = props.poi_info[type]["color"];

    let display_title =  props.feature.properties.name;
    if(display_title == null){
      display_title = display_type;
    }

    return {
      display_type,
      display_title,
      color
    }
  }
};
</script>

<style scoped>
.poi-sidebar-item {
  @apply p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer
  dark:text-title-dark-mode-text dark:bg-gray-800 dark:hover:bg-gray-700;
}

.poi-sidebar-title {
  @apply text-lg font-semibold text-gray-800
  dark:text-title-dark-mode-text; 
}

.poi-sidebar-description {
  @apply text-sm text-gray-500
  dark:text-title-dark-mode-text; 
  ;
}
</style>