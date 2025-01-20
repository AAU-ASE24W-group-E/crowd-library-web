<template>
  <div class="tw-component-container" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:justify-center">
      <div>
        <button
          @click="mapClicked"
          :class="getMapButtonClass"
          class="map-search-btn btn-primary rounded-r-none rounded-l-md w-28 hover:scale-100 hover:-translate-y-0"
        >
          Map
        </button>
        <button
          @click="listClicked"
          :class="getListButtonClass"
          class="list-search-btn  btn-primary rounded-l-none rounded-r-md w-28 hover:scale-100 hover:-translate-y-0"
        >
          Book List
        </button>
      </div>
    </div>

    <BookSearchMap ref="mapComponent" v-show="!showBookList" :books="currentBooks" />
    <BookSearchList ref="listComponent"
      v-show="showBookList"
      :books="currentBooks"
      @showOnMapClicked="showOnMapClicked"
    />
  </div>
</template>

<script setup lang="ts">
import BookSearchList from '@/components/BookSearchList.vue';
import BookSearchMap from '@/components/BookSearchMap.vue';
import { computed, ref, shallowRef, triggerRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookService } from '@/services/BookService'
import { Snackbar } from '@/utils/snackbar.ts'
import { SnackbarType } from '@/enums/snackbar.ts'
import { useUserStore } from '@/stores/user.ts'
import type { OwnBook } from '@/interfaces/ownBook.ts';
import config from "@/config.json";

const showBookList = ref(true);
const mapComponent =  ref<InstanceType<typeof BookSearchMap> | null>(null);
const listComponent =  ref<InstanceType<typeof BookSearchList> | null>(null);
// Used to receive the input string of the search bar
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const currentBooks: OwnBook[] = shallowRef([])

const isLoading = ref(false)

// replace mock books in currentBooks by content loaded from the server using query parameter
watch(() => route.query.q, fetchAvailableBooks, { immediate: true })

async function fetchAvailableBooks(q) {
  showBookList.value = true;

  if (!q || q === '') {
    console.log('No query parameter provided')
    return
  }
  let userLocation = userStore.user?.address
  if (!userStore.user) {
    userLocation = {
      longitude: config.POI_MAP_DEFAULT_CENTER[0],
      latitude: config.POI_MAP_DEFAULT_CENTER[1]
    }
  } else if (!userLocation || !userLocation.longitude || !userLocation.latitude) {
    console.error('User location not available')
    Snackbar.showSnackbar('Please set your location first', SnackbarType.GENERAL)
    await router.push('/set-location');
    return
  }
  // fetch books from the server
  console.log('fetching books with query:', q)
  const query = {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    quickSearch: q
  }
  try {
    isLoading.value = true
    const response = await bookService.getAvailableBooks(query)
    console.log('Books fetched:', response)
    if (response.status === 200) {
      const books = response.data.results
      currentBooks.value.splice(0, currentBooks.value.length, ...books)
      updateBooksInChildComponents(currentBooks.value)
      console.log('Available Books:', currentBooks.value)
    } else {
      console.error('Error fetching books:', response)
      Snackbar.showSnackbar('Error fetching books', SnackbarType.ERROR)
    }
  } catch (err) {
    console.error('Error fetching books:', err)
    Snackbar.showSnackbar('Error fetching books', SnackbarType.ERROR)
  } finally {
    isLoading.value = false
  }
}

const getListButtonClass = computed(() => ({
  'btn-blue': showBookList.value,
  'btn-transparent': !showBookList.value,
}));

const getMapButtonClass = computed(() => ({
  'btn-blue': !showBookList.value,
  'btn-transparent': showBookList.value,
}));

const mapClicked = () => {
  showBookList.value = false;
};

const listClicked = () => {
  showBookList.value = true;
};

const showOnMapClicked = (book:OwnBook) => {
  showBookList.value = false;
  mapComponent.value.zoomToPoint(book);
};

const updateBooksInChildComponents = (books:OwnBook[]) => {
  mapComponent.value.updateBooks(books);
  listComponent.value.updateBooks(books)
};
</script>
