<template>
  <div class="tw-component-container border-1 dark:bg-dark-mode-inside">
    <div class="flex flex-row w-full border-1">
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
        <div class="flex flex-row space-x-8">
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
              class="tw-book-entry-info-value">{{ book.status }}</span></span>
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


  </div>
</template>


<script setup>
let book = {
  title: "Book1",
  year: "2020",
  author: "Testauthor",
  publisher: "someone",
  format: "paperback",
  language: "DE",
  ISBN: "12484823822",
  owner: "Testowner",
  isAvailable: true,
  isLendable: true,
  isExchangeable: true,
  isGiftable: true,
  status: "available",
  lentDueDate: null
}

</script>

<style>
.tw-book-entry-info-title {
  @apply text-sm dark:text-title-dark-mode-text;
}

.tw-book-entry-info-value {
  @apply text-gray-600 dark:text-gray-400;
}
</style>
