<template>
  <main class="tw-page-container">
    <Navbar />
    <Requests />
    <div class="tw-footer-margin"></div>
    <Footer />
  </main>
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/navbar/Navbar.vue';
import Requests from '@/components/Requests.vue';
</script>
