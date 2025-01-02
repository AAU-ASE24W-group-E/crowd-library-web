<template>
  <main class="tw-page-container">
    <Navbar/>
    <div class="map-sidebar-container">
      <div class="map-container">
        <POIMapComponent ref="mapComponent" :poi_info="poi_info" />
      </div>
      <aside class="poi-sidebar-container" >
        <POILegend :poi_info="poi_info" />
        <POISidebarList  :poi_info="poi_info" @item-clicked="itemClicked"/>
      </aside>
    </div>
  <Footer/>
</main>
</template>

<script>
import POIMapComponent from '@/components/POIMapComponent.vue'
import POISidebarList from '@/components/POISidebarList.vue'
import POILegend from '@/components/POILegend.vue'
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/Footer.vue";

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
      poi_info: {
        library: {
          osm_type: '"amenity"="public_bookcase"',
          display_type: 'Library',
          color: '#6584ad',
        },
        public_bookcase: {
          osm_type: '"amenity"="library"',
          display_type: 'Tiny Library',
          color: '#F4BB44',
        },
        shop_books: {
          osm_type: '"shop"="books"',
          display_type: 'Book Shop',
          color: '#FF6F61',
        },
        // can be extended here like this
        // drinking_water:{
        //   osm_type: '"amenity"="drinking_water"',
        //   display_type: 'Drinking Water',
        //   color: "#0948ad",
        // }
      },
    }
  },
}
</script>
