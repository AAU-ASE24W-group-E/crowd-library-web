<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import BookSearchMap from "@/components/BookSearchMap.vue";
</script>

<template>
  <main class="tw-page-container">
    <Navbar/>
    <BookSearchMap/>
    <div class="tw-footer-margin"></div>
    <Footer/>
  </main>
</template>
