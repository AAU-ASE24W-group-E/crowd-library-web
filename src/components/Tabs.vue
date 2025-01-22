<template>
  <div class="tabs">
    <div class="tab-titles">
      <div
        v-for="(child, index) in $slots.default()"
        :key="index"
        class="tab-title"
        :class="{ active: activeTab === index }"
        @click="activateTab(index)"
      >
        {{ child.props.title }}
      </div>
    </div>

    <div class="tab-content">
      <div
        v-for="(child, index) in $slots.default()"
        :key="index"
        v-show="activeTab === index"
      >
        <component :is="child"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref(0);

function activateTab(index) {
  activeTab.value = index;
}
</script>
