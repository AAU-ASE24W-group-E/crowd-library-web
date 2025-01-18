<template>
  <div class="tw-component-container" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center max-[480px]:justify-center">
      <div>
        <button
          @click="mapClicked"
          :class="getMapButtonClass"
          class="btn-primary rounded-r-none rounded-l-md w-28 hover:scale-100 hover:-translate-y-0"
        >
          Map
        </button>
        <button
          @click="listClicked"
          :class="getListButtonClass"
          class="btn-primary rounded-l-none rounded-r-md w-28 hover:scale-100 hover:-translate-y-0"
        >
          Book List
        </button>
      </div>
    </div>

    <BookSearchMap ref="mapComponent" v-show="!showBookList" :books="currentBooks" />
    <BookSearchList
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
// Used to receive the input string of the search bar
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const currentBooks: OwnBook[] = shallowRef([
  {
    book: {
      id: '1',
      title: 'The Forgotten Forest',
      isbn: '1122334455',
      publisher: 'Whispering Pines',
      publishYear: 2015,
      coverId: '14625765-L',
      edition: 'First Edition',
      format: 'Paperback',
      authors: ['Alice Morningstar'],
      languages: ['EN'],
    },
    lendable: true,
    giftable: true,
    exchangeable: false,
    status: true, // Available
    distance: 0,
    owner: {
      id: 'Owner1',
      name: 'Owner1',
      latitude: 46.617415,
      longitude: 14.263625,
    },
  },
  {
    book: {
      id: '2',
      title: 'Whispers of the Sea',
      isbn: '2233445566',
      publisher: 'Ocean Breeze Press',
      publishYear: 2020,
      coverId: '14625766-L',
      edition: 'First Edition',
      format: 'Hardcover',
      authors: ['John Saltsworth'],
      languages: ['EN'],
    },
    lendable: false,
    giftable: false,
    exchangeable: true,
    status: false, // Unavailable
    distance: 0,
    owner: {
      id: 'Owner2',
      name: 'Owner2',
      latitude: 46.619025,
      longitude: 14.265755,
    },
  },
  {
    book: {
      id: '3',
      title: 'A Dance in the Rain',
      isbn: '3344556677',
      publisher: 'Rainfall Publishing',
      publishYear: 2019,
      coverId: '14625767-L',
      edition: 'Second Edition',
      format: 'Paperback',
      authors: ['Elena Storm'],
      languages: ['ES'],
    },
    lendable: true,
    giftable: false,
    exchangeable: false,
    status: true, // Available
    distance: 0,
    owner: {
      id: 'Owner3',
      name: 'Owner3',
      latitude: 46.622305,
      longitude: 14.272915,
    },
  }
])

const isLoading = ref(false)

// replace mock books in currentBooks by content loaded from the server using query parameter
watch(() => route.query.q, fetchAvailableBooks, { immediate: true })

async function fetchAvailableBooks(q) {
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
      triggerRef(currentBooks)
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
</script>
