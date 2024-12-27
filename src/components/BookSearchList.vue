<template>
  <div class="tw-component-container space-y-6">
    <BookEntry
      v-for="(book, index) in books"
      :key="index"
      :book="book"
      :isWishlist="isWishlist"
    />
  </div>
</template>

<script setup>
import BookEntry from "@/components/BookEntry.vue";
import { ref } from "vue";

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
