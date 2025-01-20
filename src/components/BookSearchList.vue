<template>
  <div class="tw-component-container px-0 w-full" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:flex-col">
      <div>
        <h1 class="tw-subheading text-[30px]">Book List</h1>
      </div>
      <div class="flex flex-row items-center space-x-6 pr-1">
        <div class="flex flex-row items-center space-x-2">
          <span class="dark:text-title-dark-mode-text">Sort by:</span>
          <div class="relative">
            <select
              id="version-category"
              class="h-[40px] tw-select appearance-none pr-8"
              @change="handleSelection($event)"
            >
              <option value="" disabled selected>Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <font-awesome-icon :icon="faChevronDown" class="text-xs"></font-awesome-icon>
            </div>
          </div>
        </div>

        <div class="tw-navbar-dropdown-container">
          <button
            @click="handleSortClick"
            id="sort-button"
            class="navbar-button-container btn-primary"
          >
            <font-awesome-icon :icon="faArrowDownWideShort" class="text-2xl tw-icon" />
          </button>
          <div
            v-if="dropdownSortOpen"
            class="-right-4 w-[400px] max-sm:w-[200px] tw-dropdown-inner-layout p-3"
          >
            <div class="flex-col flex items-center justify-center space-y-3">
              <span class="p-2 text-lg text-center dark:text-title-dark-mode-text">Filter by your preferences</span>
              <div class="flex flex-row space-x-2 w-[80%] max-sm:w-full">
                <span class="w-[50%] dark:text-title-dark-mode-text">Distance: {{filterModel.distance}} km</span>
                <input class="w-[40%]" type="range"
                       min="2" max="50" step="1"
                       v-model.lazy="filterModel.distance"
                       @change="updateFilter" />
              </div>
              <div class="flex flex-row space-x-2 w-[80%] max-sm:w-full">
                <label class="w-[50%] dark:text-title-dark-mode-text" for="filter-author">Author:</label>
                <input class="tw-input px-2 h-4 rounded-md w-[40%]" id="filter-author"
                       v-model.trim="filterModel.author"
                       @change="updateFilter" />
              </div>
              <div class="flex flex-row space-x-6 max-sm:flex-col max-sm:space-x-0">
                <div class="flex items-center">
                  <input class="tw-checkbox" type="checkbox" id="filter-lendable"
                         v-model="filterModel.lendable"
                         @change="updateFilter" />
                  <label class="dark:text-title-dark-mode-text" for="filter-lendable">lendable</label>
                </div>
                <div class="flex items-center">
                  <input class="tw-checkbox" type="checkbox" id="filter-exchangeable"
                         v-model="filterModel.exchangeable" />
                  <label class="dark:text-title-dark-mode-text" for="filter-exchangeable">exchangeable</label>
                </div>
                <div class="flex items-center">
                  <input class="tw-checkbox" type="checkbox" id="filter-giftable"
                         v-model="filterModel.giftable" />
                  <label class="dark:text-title-dark-mode-text" for="filter-giftable">giftable</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedCategories.length > 0" class="flex flex-row w-full mt-4 space-x-2">
      <div v-for="category in selectedCategories" :key="category">
        <div class="rounded-2xl bg-gray-200 dark:bg-dark-mode-inside py-1 px-2 space-x-2">
          <font-awesome-icon
            id="remove-category"
            @click="removeSelectedCategory(category)"
            :icon="faX"
            class="text-base w-4 h-4 tw-icon"
          />
          <span class="dark:text-title-dark-mode-text">{{ category }}</span>
        </div>
      </div>
    </div>

    <div v-if="books.length > 0" class="space-y-6 w-full mt-4">
      <BookEntry
        v-for="(book, index) in books"
        :key="index"
        :book="book.book"
        :ownBook="book"
        :isWishlist="isWishlist"
        :isSearchBook="true"
        @showOnMapClicked="showOnMapClicked"
      />
    </div>
    <div v-if="books.length <= 0" class="space-y-6 w-full mt-4 dark:text-title-dark-mode-text">
      No books found. Enter a prompt to the search to find books!
    </div>
  </div>
</template>

<script setup lang="ts">
import BookEntry from '@/components/BookEntry.vue';
import { defineProps, onMounted, onUnmounted, ref, defineExpose, watch } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowDownWideShort, faChevronDown, faX } from '@fortawesome/free-solid-svg-icons';

const categories = ref(['Distance', 'Author', 'Title', 'Year'].sort());
const selectedCategories = ref([]);

const props = defineProps(['books']);
const emits = defineEmits(['showOnMapClicked']);

// Example array of books
const books = ref(props.books);

const dropdownSortOpen = ref(false);
const isWishlist = ref(false); // needed to determine if book entry is shown on book list or wishlist
const dropdownRef = ref(null);

interface Filter {
  distance?: number;
  author?: string;
  lendable?: boolean;
  exchangeable?: boolean;
  giftable?: boolean;
}
const filterModel = ref<Filter>({ distance: 10 });
watch(filterModel, (newVal) => {
  console.log('Filter changed:', newVal);
});

function updateFilter() {
  console.log('Filter updated:', filterModel.value);
}

const handleSelection = (event) => {
  const selectedValue = event.target.value;
  if (selectedValue) {
    categories.value = categories.value.filter((category) => category !== selectedValue);

    selectedCategories.value.push(selectedValue);

    event.target.value = '';
  }
};

const handleSortClick = () => {
  dropdownSortOpen.value = !dropdownSortOpen.value;
};

const removeSelectedCategory = (selectedCategory) => {
  categories.value.push(selectedCategory);
  selectedCategories.value = selectedCategories.value.filter(
    (category) => category !== selectedCategory,
  );

  categories.value.sort();
};

const handleClickOutside = (event) => {
  if (dropdownSortOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownSortOpen.value = false;
  }
};

const showOnMapClicked = (book) => {
  emits('showOnMapClicked', book);
};

const updateBooks = (newBooks) => {
  books.value =  [...newBooks];
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

defineExpose({
  updateBooks,
});
</script>
