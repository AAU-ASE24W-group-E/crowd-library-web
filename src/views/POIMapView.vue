
<template>
  <div class="bg-gray-200 dark:bg-dark-mode">
    <!-- <div class="tw-component-container bg-gray-200 dark:bg-dark-mode"> -->
    <div class="map-sidebar-container">
      <div class="map-container">
        <POIMapComponent :poi_info="poi_info" />
      </div>
      <aside class="poi-sidebar-container">
        <POILegend :poi_info="poi_info"/>
        <POISidebarList/>
      </aside>
    </div>
  </div>
</template>

<script setup>
import POIMapComponent from '@/components/POIMapComponent.vue'
import POISidebarList from '@/components/POISidebarList.vue'
import POILegend from '@/components/POILegend.vue'

//to do color
// toggle emit

const poi_info = {
  library: {
    osm_type: '"amenity"="public_bookcase"',
    display_type: 'Library',
    color: ''
  },
  public_bookcase: {
    osm_type: '"amenity"="library"',
    display_type: 'Tiny Library',
    color: ''
  },
  shop_books: {
    osm_type: '"shop"="books"',
    display_type: 'Book Shop',
    color: ''
  }
}
</script>
