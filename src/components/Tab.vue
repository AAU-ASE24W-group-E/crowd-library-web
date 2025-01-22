<template>
  <slot></slot>
</template>

<script>
import { defineComponent } from 'vue';

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
    }
  }
});
</script>
