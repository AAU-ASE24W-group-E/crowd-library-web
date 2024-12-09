<script setup>
import POILegendItem from "@/components/POILegendItem.vue";
const title_legend = "Legend"
</script>

<template>
    
    <div class="tw-heading-2 mb-5 mt-2">{{ title_legend }}</div>
    <div class="legend-box">
        <POILegendItem title="Libraries" color="#c8191a" />
        <POILegendItem title="Tiny Libraries" color="#2f6c9d" />
        <POILegendItem title="Book Shops" color="#119611" />
    </div>
</template>

<style>
.legend-box {
    @apply bg-gray-100 rounded-lg mr-10
}

</style>