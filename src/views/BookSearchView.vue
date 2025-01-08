<template>
  <main class="tw-page-container">
    <Navbar />
    <BookSearch/>
    <div class="tw-footer-margin"></div>
    <Footer />
  </main>
</template>

<script setup>
  import BookSearch from '@/components/BookSearch.vue'
  import Footer from "@/components/Footer.vue";
  import Navbar from "@/components/navbar/Navbar.vue";
</script>
