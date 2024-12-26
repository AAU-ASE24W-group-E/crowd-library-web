<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import BookEntry from "@/components/BookEntry.vue";
import Navbar from "@/components/navbar/Navbar.vue";
</script>

<template>
  <main class="tw-page-container">
    <Navbar/>
    <BookSearchList/>
    <div class="tw-footer-margin"></div>
    <Footer/>
  </main>
</template>
