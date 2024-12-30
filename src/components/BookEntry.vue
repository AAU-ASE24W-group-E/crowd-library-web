<template>
  <div
    class="tw-component-container w-full bg-white dark:bg-dark-mode-inside shadow-md rounded-lg border border-gray-200 dark:border-gray-600 transition duration-500 ease-in-out hover:scale-101 animate-fade-in">
    <div class="flex flex-row w-full">
      <img
        src="../assets/logo_simple.png"
        alt="logo"
        class="object-contain decoration-0 mr-3"
      />
      <div class="flex flex-col">
        <span
          class="text-xl font-semibold dark:text-title-dark-mode-text">{{ book.title }} ({{
            book.year
          }}) by {{ book.author }}</span>
        <div class="flex flex-row max-sm:flex-col sm:space-x-8 max-sm:space-y-2">
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">Publisher: <span
              class="tw-book-entry-info-value">{{ book.publisher }}</span></span>
            <span class="tw-book-entry-info-title">Format: <span
              class="tw-book-entry-info-value">{{ book.format }}</span></span>
            <span class="tw-book-entry-info-title">Language: <span
              class="tw-book-entry-info-value">{{ book.language }}</span></span>
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title">ISBN: <span
              class="tw-book-entry-info-value">{{ book.ISBN }}</span></span>
            <span class="tw-book-entry-info-title">Owner: <span class="tw-book-entry-info-value">{{ book.owner }}</span></span>
            <span class="tw-book-entry-info-title">Status: <span
              :class="{'text-green-500': book.isAvailable, 'text-red-500': !book.isAvailable}">
              {{ book.status }}</span></span>
            <!--            <span>Availability</span>-->
            <!--            <span>Due Date</span> -->
          </div>
          <div v-if="book.isAvailable" class="flex flex-col">
             <span class="tw-book-entry-info-title">Lendable:
               <span :class="{'text-green-500': book.isLendable, 'text-red-500': !book.isLendable}">
                 {{ book.isLendable ? 'Yes' : 'No' }}
               </span>
              </span>

            <span class="tw-book-entry-info-title">
              Exchangeable:
              <span :class="{'text-green-500': book.isExchangeable, 'text-red-500': !book.isExchangeable}">
                {{ book.isExchangeable ? 'Yes' : 'No' }}
              </span>
            </span>

            <span class="tw-book-entry-info-title">
              Giftable:
              <span :class="{'text-green-500': book.isGiftable, 'text-red-500': !book.isGiftable}">
                {{ book.isGiftable ? 'Yes' : 'No' }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row w-full mt-2 space-x-20 ml-48 max-sm:space-x-8 max-sm:justify-center max-sm:ml-0">
      <button v-if="!isWishlist" class="btn-primary btn-gray rounded-2xl">Add to wishlist</button>
      <button class="btn-primary btn-green rounded-2xl">Send request</button>
    </div>
  </div>
</template>


<script setup>
// TODO delete button in wishlist

defineProps({
  book: {
    type: Object,
    required: true,
  },
  isWishlist: {
    type: Boolean,
    default: false,
  },
});

</script>

<style>
.tw-book-entry-info-title {
  @apply text-sm dark:text-title-dark-mode-text;
}

.tw-book-entry-info-value {
  @apply text-gray-600 dark:text-gray-400;
}
</style>
