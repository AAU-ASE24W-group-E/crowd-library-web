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
export default {
    data() {
        return {
            activeTab: 0,  // Index of the active tab
            tabs: []        // Array to store the tabs
        };
    },
    methods: {
        // Activate the tab based on its index
        activateTab(index) {
            this.activeTab = index;
        },

        // Register a tab component (called by Tab.vue)
        registerTab(tab) {
            this.tabs.push(tab);
        }
    }
};
</script>