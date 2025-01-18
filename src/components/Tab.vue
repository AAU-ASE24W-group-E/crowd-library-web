<template>
    <div v-show="isActive" class="tab">
        <slot></slot> <!-- Use slot to insert content later when used -->
    </div>
</template>
<script>
import { defineComponent, inject } from 'vue';
export default defineComponent({
    name: 'Tab',
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            index: null // Initialize index
        };
    },
    computed: {
        /* Check if this tab is active by comparing index with activeTab from Tabs Component */
        isActive() {
            if (this.index !== null) {
                return this.$parent.activeTab === this.index;
            }
            return false;
        }
    },
    mounted() {
        // Access the parent (=Tabs) component after the component has been mounted
        if (this.$parent && this.$parent.tabs) {
            this.index = this.$parent.tabs.length;
            this.$parent.registerTab({
                title: this.title,
                name: this.name
            });

            if (this.index === 0) {
                this.$parent.activateTab(this.index);
            }
        } else {
            console.warn('Parent (=Tabs) component not available yet');
        }
    }
});
</script>