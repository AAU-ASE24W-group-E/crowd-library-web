<template>
  <main class="tw-page-container">
    <Navbar />
    <div class="map-sidebar-container">
      <div class="map-container">
        <POIMapComponent ref="mapComponent" :poi_info="poi_info" />
      </div>
      <aside class="poi-sidebar-container">
        <POILegend :poi_info="poi_info" />
        <POISidebarList :poi_info="poi_info" @item-clicked="itemClicked" />
      </aside>
    </div>
    <Footer />
  </main>
</template>

<script>
import POIMapComponent from '@/components/POIMapComponent.vue'
import POISidebarList from '@/components/POISidebarList.vue'
import POILegend from '@/components/POILegend.vue'
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/Footer.vue";
import config from "@/config.json";


export default {
  components:{
    POIMapComponent,
    POISidebarList,
    POILegend,
    Navbar,
    Footer
  },
  methods: {
    itemClicked(feature) {
      this.$refs.mapComponent.zoomToClickedItem(feature)
    }
  },
  data() {
    return {
      // Additional POI types can be added in config file, e.g.:
      // "drinking_water": {
      //   "osm_type": "\"amenity\"=\"drinking_water\"",
      //   "display_type": "Drinking Water",
      //   "color": "#0948ad"
      // }
      poi_info: config.POI_TYPES
    }
  }
}
</script>
