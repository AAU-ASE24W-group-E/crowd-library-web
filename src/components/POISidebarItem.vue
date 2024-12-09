<template>
  <div class="poi-sidebar-item">
    <h3 class="poi-sidebar-title">{{ title }}</h3>
    <p class="poi-sidebar-description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
};
</script>

<style scoped>
.poi-sidebar-item {
  @apply p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer;
}

.poi-sidebar-title {
  @apply text-lg font-semibold text-gray-800;
}

.poi-sidebar-description {
  @apply text-sm text-gray-500;
}
</style>