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

<script setup>
import BookSearchList from '@/components/BookSearchList.vue';
import BookSearchMap from '@/components/BookSearchMap.vue';
import { computed, ref, shallowRef, triggerRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookService } from '@/services/BookService'
import { Snackbar } from '@/utils/snackbar.ts'
import { SnackbarType } from '@/enums/snackbar.ts'
import { useUserStore } from '@/stores/user.ts'

const showBookList = ref(true);
const mapComponent = ref(null);

// Used to receive the input string of the search bar
// Todo books request must be handled
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
//const query = route.query.q || null;

const currentBooks = shallowRef([
  {
    title: 'The Forgotten Forest',
    year: '2015',
    author: 'Alice Morningstar',
    publisher: 'Whispering Pines',
    format: 'Paperback',
    language: 'EN',
    ISBN: '1122334455',
    owner: 'Owner1',
    isAvailable: true,
    isLendable: true,
    isExchangeable: false,
    isGiftable: true,
    status: 'Available',
    lat: 46.617415,
    long: 14.263625,
  },
  {
    title: 'Whispers of the Sea',
    year: '2020',
    author: 'John Saltsworth',
    publisher: 'Ocean Breeze Press',
    format: 'Hardcover',
    language: 'EN',
    ISBN: '2233445566',
    owner: 'Owner2',
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: 'Unavailable',
    lat: 46.619025,
    long: 14.265755,
  },
  {
    title: 'A Dance in the Rain',
    year: '2019',
    author: 'Elena Storm',
    publisher: 'Rainfall Publishing',
    format: 'Paperback',
    language: 'ES',
    ISBN: '3344556677',
    owner: 'Owner3',
    isAvailable: true,
    isLendable: true,
    isExchangeable: false,
    isGiftable: false,
    status: 'Available',
    lat: 46.622305,
    long: 14.272915,
  },
  {
    title: 'Mysterious Shadows',
    year: '2018',
    author: 'Victor Wraith',
    publisher: 'Nightfall Books',
    format: 'Paperback',
    language: 'FR',
    ISBN: '4455667788',
    owner: 'Owner4',
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: 'Unavailable',
    lat: 46.618815,
    long: 14.271225,
  },
  {
    title: 'The Sun and the Moon',
    year: '2021',
    author: 'Catherine Sky',
    publisher: 'Celestial Works',
    format: 'Hardcover',
    language: 'DE',
    ISBN: '5566778899',
    owner: 'Owner5',
    isAvailable: true,
    isLendable: false,
    isExchangeable: false,
    isGiftable: true,
    status: 'Available',
    lat: 46.616305,
    long: 14.268425,
  },
  {
    title: 'Echoes of Tomorrow',
    year: '2022',
    author: 'Kieran Steele',
    publisher: 'Future Vision',
    format: 'Paperback',
    language: 'EN',
    ISBN: '6677889900',
    owner: 'Owner6',
    isAvailable: true,
    isLendable: true,
    isExchangeable: true,
    isGiftable: false,
    status: 'Available',
    lat: 46.620505,
    long: 14.264215,
  },
  {
    title: 'The Art of War in Peace',
    year: '2016',
    author: 'Maximus V',
    publisher: 'Warrior Publishing',
    format: 'Paperback',
    language: 'IT',
    ISBN: '7788990011',
    owner: 'Owner7',
    isAvailable: false,
    isLendable: true,
    isExchangeable: false,
    isGiftable: true,
    status: 'Unavailable',
    lat: 46.625725,
    long: 14.261905,
  },
  {
    title: 'Whispers from the Past',
    year: '2020',
    author: 'Miriam Fields',
    publisher: 'Echoes Press',
    format: 'Hardcover',
    language: 'FR',
    ISBN: '8899001122',
    owner: 'Owner8',
    isAvailable: true,
    isLendable: false,
    isExchangeable: false,
    isGiftable: true,
    status: 'Available',
    lat: 46.616905,
    long: 14.269215,
  },
  {
    title: 'Into the Void',
    year: '2017',
    author: 'Lara Night',
    publisher: 'Void Press',
    format: 'Paperback',
    language: 'EN',
    ISBN: '9900112233',
    owner: 'Owner9',
    isAvailable: true,
    isLendable: true,
    isExchangeable: true,
    isGiftable: false,
    status: 'Available',
    lat: 46.617215,
    long: 14.274015,
  },
  {
    title: 'Lost in the Cosmos',
    year: '2018',
    author: 'Nico Starfield',
    publisher: 'Galactic Publishing',
    format: 'Hardcover',
    language: 'IT',
    ISBN: '1122335566',
    owner: 'Owner10',
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: true,
    status: 'Unavailable',
    lat: 46.619415,
    long: 14.263725,
  },
  {
    title: 'Between the Lines',
    year: '2019',
    author: 'Sophia Cloud',
    publisher: 'Cloud Nine Press',
    format: 'Paperback',
    language: 'DE',
    ISBN: '2233446677',
    owner: 'Owner11',
    isAvailable: true,
    isLendable: true,
    isExchangeable: false,
    isGiftable: true,
    status: 'Available',
    lat: 46.623905,
    long: 14.270415,
  },
  {
    title: 'The Snowfall Diaries',
    year: '2020',
    author: 'Elliott Frost',
    publisher: 'Winter Tales',
    format: 'Paperback',
    language: 'ES',
    ISBN: '3344557788',
    owner: 'Owner12',
    isAvailable: true,
    isLendable: true,
    isExchangeable: true,
    isGiftable: false,
    status: 'Available',
    lat: 46.622105,
    long: 14.273815,
  },
  {
    title: 'The Clockwork Angel',
    year: '2021',
    author: 'Isabella Steele',
    publisher: 'Mechanical Heart',
    format: 'Hardcover',
    language: 'EN',
    ISBN: '4455668899',
    owner: 'Owner13',
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: 'Unavailable',
    lat: 46.625905,
    long: 14.261315,
  },
  {
    title: 'The King’s Legacy',
    year: '2017',
    author: 'Sebastian Roy',
    publisher: 'Royal Words Publishing',
    format: 'Paperback',
    language: 'FR',
    ISBN: '5566779900',
    owner: 'Owner14',
    isAvailable: true,
    isLendable: false,
    isExchangeable: false,
    isGiftable: true,
    status: 'Available',
    lat: 46.618405,
    long: 14.266215,
  },
  {
    title: 'The Hidden City',
    year: '2022',
    author: 'Julian Blackwood',
    publisher: 'Lost Worlds Press',
    format: 'Paperback',
    language: 'EN',
    ISBN: '6677881111',
    owner: 'Owner15',
    isAvailable: true,
    isLendable: true,
    isExchangeable: false,
    isGiftable: false,
    status: 'Available',
    lat: 46.620715,
    long: 14.264825,
  },
  {
    title: 'Chasing Stars',
    year: '2016',
    author: 'Zara Fields',
    publisher: 'Starlight Press',
    format: 'Hardcover',
    language: 'ES',
    ISBN: '7788992233',
    owner: 'Owner16',
    isAvailable: true,
    isLendable: false,
    isExchangeable: true,
    isGiftable: true,
    status: 'Available',
    lat: 46.621605,
    long: 14.269025,
  },
  {
    title: 'The Eternal Dreamer',
    year: '2021',
    author: 'Vivian Moon',
    publisher: 'Dreamworld Press',
    format: 'Paperback',
    language: 'IT',
    ISBN: '8899003344',
    owner: 'Owner17',
    isAvailable: false,
    isLendable: true,
    isExchangeable: false,
    isGiftable: false,
    status: 'Unavailable',
    lat: 46.624405,
    long: 14.271815,
  },
  {
    title: 'Rise of the Phoenix',
    year: '2019',
    author: 'Aiden Blaze',
    publisher: 'Phoenix Publishing',
    format: 'Paperback',
    language: 'EN',
    ISBN: '9900114455',
    owner: 'Owner18',
    isAvailable: true,
    isLendable: true,
    isExchangeable: true,
    isGiftable: true,
    status: 'Available',
    lat: 46.625115,
    long: 14.262625,
  },
  {
    title: 'In the Shadow of the Mountain',
    year: '2018',
    author: 'Henry Wild',
    publisher: 'Wild Adventures Press',
    format: 'Paperback',
    language: 'DE',
    ISBN: '1122335566',
    owner: 'Owner19',
    isAvailable: true,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: 'Available',
    lat: 46.616705,
    long: 14.273605,
  },
  {
    title: 'The Last Light',
    year: '2020',
    author: 'Carla Winters',
    publisher: 'Endless Twilight',
    format: 'Hardcover',
    language: 'FR',
    ISBN: '2233446677',
    owner: 'Owner20',
    isAvailable: false,
    isLendable: false,
    isExchangeable: true,
    isGiftable: false,
    status: 'Unavailable',
    lat: 46.623205,
    long: 14.268315,
  },
]);

const isLoading = ref(false)

// replace mock books in currentBooks by content loaded from the server using query parameter
watch(() => route.query.q, fetchAvailableBooks, { immediate: true })

async function fetchAvailableBooks(q) {
  if (!q || q === '') {
    console.log('No query parameter provided')
    return
  }
  const userLocation = userStore.user?.address
  if (!userLocation || !userLocation.longitude || !userLocation.latitude) {
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
    //loading.value = true
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
    //loading.value = false
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

const showOnMapClicked = (book) => {
  showBookList.value = false;
  mapComponent.value.zoomToPoint(book);
};
</script>
