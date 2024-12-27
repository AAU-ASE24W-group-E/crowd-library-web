<template>
  <div class="tw-component-container">
    <div class="flex flex-row w-full justify-between items-center">
      <!--      TODO-->
      <button class="btn-primary btn-green">Test</button>
      <div class="flex flex-row items-center space-x-6 pr-1">
        <span>Sort by</span>
        <input type="text" class="tw-input h-8 w-40"/>
        <font-awesome-icon :icon="faArrowDownWideShort" class="text-2xl tw-icon"/>
      </div>
    </div>

    <div class="space-y-6 w-full mt-4">
      <BookEntry
        v-for="(book, index) in books"
        :key="index"
        :book="book"
        :isWishlist="isWishlist"
      />
    </div>
  </div>
</template>

<script setup>
import BookEntry from "@/components/BookEntry.vue";
import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faArrowDownWideShort} from "@fortawesome/free-solid-svg-icons";

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

const isWishlist = ref(false); // needed to determine if book entry is shown on book list or wishlist
</script>
