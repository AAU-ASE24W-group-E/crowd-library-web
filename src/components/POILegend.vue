<script setup>
import POILegendItem from "@/components/POILegendItem.vue";
import colors from '@/assets/color'
const title_legend = "Legend"

</script>

<template>
    
    <div class="tw-heading-2 mb-5 mt-2">{{ title_legend }}</div>
    <div class="legend-box">
        <POILegendItem title="Libraries" type="library"/>
        <POILegendItem title="Tiny Libraries" type="public_bookcase"/>
        <POILegendItem title="Book Shops" type="shop_books"/>
    </div>
</template>

<style>
.legend-box {
    @apply bg-gray-100 rounded-lg mr-10
}

</style>

