<script setup lang="ts">
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/Footer.vue";
import DataPrivacy from '@/components/DataPrivacy.vue'
</script>

<template>
  <main class="tw-page-container">
    <Navbar/>
    <DataPrivacy/>
    <div class="tw-footer-margin"></div>
    <Footer/>
  </main>
</template>
