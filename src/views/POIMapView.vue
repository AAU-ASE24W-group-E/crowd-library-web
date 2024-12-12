<script setup lang="ts">
import POIMapComponent from "@/components/POIMapComponent.vue";
import POISidebarList from "@/components/POISidebarList.vue";
import POILegend from "@/components/POILegend.vue";
</script>

<template>
  <div class=" bg-gray-200 dark:bg-dark-mode">
    <!-- <div class="tw-component-container bg-gray-200 dark:bg-dark-mode"> -->
    <div class="map-sidebar-container">
      <div class="map-container">
        <POIMapComponent />
      </div>
      <aside class="poi-sidebar-container">
        <POILegend/>
        <POISidebarList/>
      </aside>
    </div>
  </div>
</template>
