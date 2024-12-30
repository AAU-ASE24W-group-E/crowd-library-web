<template>
  <div class="tw-component-container" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center">
      <!--      TODO auslagern-->
      <div>
        <router-link to="/book-map"
                     class="btn-primary btn-transparent rounded-r-none rounded-l-md w-28 hover:scale-100 hover:-translate-y-0">
          Map
        </router-link>
        <router-link to="/book-search-list"
                     class="btn-primary btn-blue rounded-l-none rounded-r-md w-28 hover:scale-100 hover:-translate-y-0">
          Book List
        </router-link>
      </div>
      <div class="flex flex-row items-center space-x-6 pr-1">
        <div class="flex flex-row items-center space-x-2">
          <span class="dark:text-title-dark-mode-text">Sort by:</span>
          <div>
            <select
              id="version-category"
              class="h-[40px] tw-select"
              @change="handleSelection($event)"
            >
              <option value="" disabled selected>Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
        </div>

        <div class="tw-navbar-dropdown-container">
          <button
            @click="handleSortClick"
            id="sort-button"
            class="navbar-button-container btn-primary"
          >
            <font-awesome-icon :icon="faArrowDownWideShort" class="text-2xl tw-icon"/>
          </button>
          <div v-if="dropdownSortOpen" class="-right-4 w-[400px] max-sm:w-[200px] tw-dropdown-inner-layout p-3">
            <div class="flex-col flex  items-center justify-center space-y-3">
              <span class="p-2 text-lg text-center">Filter by your preferences</span>
              <div class="flex flex-row space-x-2 w-[80%] max-sm:w-full">
                <span class="w-[50%]">Distance:</span>
                <input class="w-[40%]" type="range">
              </div>
              <div class="flex flex-row space-x-2 w-[80%] max-sm:w-full">
                <span class="w-[50%]">Author:</span>
                <input class="tw-input px-2 h-4 rounded-md w-[40%]">
              </div>
              <div class="flex flex-row space-x-2 w-[80%] max-sm:w-full">
                <span class="w-[50%]">Keywords:</span>
                <input class="tw-input px-2 h-4 rounded-md w-[40%]">
              </div>
              <div class="flex flex-row space-x-6 max-sm:flex-col max-sm:space-x-0">
                <div class="flex items-center">
                  <input class="tw-checkbox" type="checkbox">
                  <span>lendable</span>
                </div>
                <div class="flex items-center">
                  <input class="tw-checkbox" type="checkbox">
                  <span>exchangeable</span>
                </div>
                <div class="flex items-center">
                  <input class="tw-checkbox" type="checkbox">
                  <span>giftable</span>
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
          <font-awesome-icon @click="removeSelectedCategory(category)" :icon="faX" class="text-base w-4 h-4 tw-icon"/>
          <span class="dark:text-title-dark-mode-text">{{ category }}</span>
        </div>
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
import {onMounted, onUnmounted, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faArrowDownWideShort, faX} from "@fortawesome/free-solid-svg-icons";

const categories = ref(['Distance', 'Author', 'Title', 'Year'].sort());
const selectedCategories = ref([]);

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

let dropdownSortOpen = ref(false);
const isWishlist = ref(false); // needed to determine if book entry is shown on book list or wishlist
const dropdownRef = ref(null);

const handleSelection = (event) => {
  const selectedValue = event.target.value;
  if (selectedValue) {

    categories.value = categories.value.filter(
      (category) => category !== selectedValue
    );

    selectedCategories.value.push(selectedValue);

    event.target.value = '';
  }
};

const handleSortClick = () => {
  dropdownSortOpen.value = !dropdownSortOpen.value;
}

const removeSelectedCategory = (selectedCategory) => {
  categories.value.push(selectedCategory)
  selectedCategories.value = selectedCategories.value.filter((category) => category !== selectedCategory)

  categories.value.sort();
}


const handleClickOutside = (event) => {
  if (
    dropdownSortOpen.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    dropdownSortOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

</script>
