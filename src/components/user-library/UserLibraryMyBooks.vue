<template>

  <!-- <UserLibraryAddBook v-show="showAddBook"/> -->
  <div class="tw-component-container px-0 w-full">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:flex-col">
      <div>
        <h1 class="tw-subheading text-[30px]">Book List</h1>
      </div>
  </div>

    <div class="space-y-6 w-full mt-4">
      <BookEntry
        v-for="(book, index) in mybooks"
        :key="index"
        :isMyBook="true"
        :book="book"
      />
    </div>
</div>
  
</template>
  
  <script setup>
    import { ref } from 'vue';
    import UserLibraryAddBook from '@/components/user-library/UserLibraryAddBook.vue'
    import BookEntry from '@/components/BookEntry.vue'
    const showAddBook = ref(true);
    const props = defineProps(['mybooks'])

    const mybooks = ref(props.mybooks);

  </script>
  