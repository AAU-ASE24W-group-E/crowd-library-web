<template>
    <div class="tabs">
        <!-- Tab titles -->
        <div class="tab-titles">
            <div v-for="(tab, index) in tabs" :key="tab.name" class="tab-title" :class="{ active: activeTab === index }"
                @click="activateTab(index)">
                {{ tab.title }}
            </div>
        </div>

        <!-- Tab content -->
        <div class="tab-content">
            <slot></slot> <!-- Placeholder for tab content -->
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const activeTab = ref(0); // Index of the active tab
        const tabs = ref([]);     // Array to store the tabs

        // Activate the tab based on its index
        const activateTab = (index) => {
            activeTab.value = index;
        };

        // Register a tab component (called by Tab.vue)
        const registerTab = (tab) => {
            tabs.value.push(tab);
        };

        return {
            activeTab,
            tabs,
            activateTab,
            registerTab,
        };
    },
};
</script>
