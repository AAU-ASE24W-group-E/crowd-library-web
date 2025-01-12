<template>
    <div class="tabs">
      <!-- Tab titles -->
      <div class="tab-titles">
        <div 
          v-for="(tab, index) in tabs" 
          :key="tab.name"
          class="tab-title" 
          :class="{ active: activeTab === index }" 
          @click="activateTab(index)"
        >
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
  
  <style scoped>
  .tabs {
    width: 100%;
  }
  
  .tab-titles {
    display: flex;
    cursor: pointer;
    border-bottom: 1px solid #d1d5db;
  }
  
  .tab-title {
    padding: 10px;
    background-color: #f1f1f1;
    border-right: 1px solid #d1d5db;
    border-top: 1px solid #d1d5db;
    border-left: 1px solid #d1d5db;
    border-radius: 10px 10px 0px 0px;
  }
  
  .tab-title.active {
    background-color: #3b82f6;
    color: white;
  }
  
  .tab-content {
    padding: 20px;
    border: 1px solid #d1d5db;
    border-top: none;
  }
  </style>
  