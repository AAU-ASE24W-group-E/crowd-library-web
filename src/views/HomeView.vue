<script setup lang="ts">
import HomeComponent from "@/components/HomeComponent.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main class="tw-page-container">
    <Navbar/>
    <HomeComponent/>
    <div class="tw-footer-margin"></div>
    <Footer/>
  </main>
</template>
