<script>
import POILegendItem from "@/components/POILegendItem.vue";
import colors from '@/assets/color'

export default {
    components:{
        POILegendItem
    },
    props: ['poi_info'],
    setup(props) {
        let poi_info = props.poi_info
    },
    data() {
    return {
      title_legend: "Legend"
    }
  },
}
</script>

<template>
    
    <div class="tw-heading-2 mb-5 mt-2">{{ title_legend }}</div>
    <div class="legend-box">
        <POILegendItem 
            v-for="(item, index) in poi_info"
            :type="index"
            :title="item.display_type"
        />
        <!-- <POILegendItem title="Libraries" type="library"/>
        <POILegendItem title="Tiny Libraries" type="public_bookcase"/>
        <POILegendItem title="Book Shops" type="shop_books"/> -->
    </div>
</template>

<style>
.legend-box {
    @apply bg-gray-100 rounded-lg mr-10
}

</style>

