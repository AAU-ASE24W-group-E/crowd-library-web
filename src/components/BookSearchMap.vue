<template>
  <div class="tw-component-container" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center">
      <!--      TODO auslagern-->
      <div>
        <router-link to="/book-search-map"
                     class="btn-primary btn-blue rounded-r-none rounded-l-md w-28 hover:scale-100 hover:-translate-y-0">
          Map
        </router-link>
        <router-link to="/book-search-list"
                     class="btn-primary btn-transparent rounded-l-none rounded-r-md w-28 hover:scale-100 hover:-translate-y-0">
          Book List
        </router-link>
      </div>
    </div>
  </div>
     
</template>

<script setup>
import {ref} from "vue";

// Example array of books
const books = ref([
  {
    title: "Book1",
    year: "2020",
    author: "Author1",
    publisher: "Publisher1",
    format: "Paperback",
    language: "EN",
    ISBN: "1234567890",
    owner: "Owner1",
    isAvailable: true,
    isLendable: true,
    isExchangeable: false,
    isGiftable: true,
    status: "Available",
  },
  {
    title: "Book2",
    year: "2021",
    author: "Author2",
    publisher: "Publisher2",
    format: "Hardcover",
    language: "FR",
    ISBN: "0987654321",
    owner: "Owner2",
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: "Unavailable",
  },
]);


</script>
