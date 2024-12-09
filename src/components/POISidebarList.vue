<script setup>
import POISidebarItem from "@/components/POISidebarItem.vue";
const title_pois = "Points of Interest"
</script>

<template>
    <div class="tw-heading-2 mb-5 mt-2">{{ title_pois }}</div>
    <POISidebarItem title="POI 1" description="Description for component 1" />
    <POISidebarItem title="POI 2" description="Description for component 2" />
    <POISidebarItem title="POI 3" description="Description for component 3" />
</template>