<template>
    <div v-show="isActive" class="tab">
      <slot></slot> <!-- Use slot to insert content later when used -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      }
    },
    computed: {
      /* Check if this tab is active by comparing index with activeTab from Tabs Component */
      isActive() {
        return this.$parent.activeTab === this.index;
      }
    },
    created() {
      this.index = this.$parent.tabs.length;
      this.$parent.registerTab({
        title: this.title,
        name: this.name
      });
    }
  };
  </script>
  