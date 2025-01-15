<script setup lang="ts">
import AccountComponent from "@/components/AccountComponent.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import Footer from "@/components/Footer.vue";
import LocationSetting from '@/components/LocationSetting.vue'
import LocationEdit from '@/components/LocationEdit.vue'
</script>

<template>
  <main class="tw-page-container">
    <Navbar/>
    <AccountComponent/>
<!--    <LocationSetting :isInSettings="true"/>-->
    <LocationEdit/>
    <div class="tw-footer-margin"></div>
    <Footer/>
  </main>
</template>
