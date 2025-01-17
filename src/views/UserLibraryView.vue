<template>
    <main class="tw-page-container">
      <Navbar />
      <UserLibrary />
      <div class="tw-footer-margin"></div>

      <Footer />
    </main>
  </template>
  
  <script setup>
    import Footer from "@/components/Footer.vue";
    import Navbar from "@/components/navbar/Navbar.vue";
    import UserLibrary from "@/components/user-library/UserLibrary.vue";
  </script>
  