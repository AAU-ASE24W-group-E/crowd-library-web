<script>
import POILegendItem from "@/components/POILegendItem.vue";

export default {
    components:{
        POILegendItem
    },
    props: ['poi_info'],
    data() {
        return {
            title_legend: "Legend"
        }
    },
}
</script>

<template>
    
    <div class="tw-heading-2 text-[1.5em] mb-5 mt-2">{{ title_legend }}</div>
    <div class="legend-box">
        <POILegendItem
            v-for="(item, key) in poi_info"
            :color="item.color"
            :title="item.display_type"
            :type="key"
        />
    </div>
</template>

<style>
.legend-box {
    @apply bg-gray-100 rounded-lg mr-10
}

</style>

