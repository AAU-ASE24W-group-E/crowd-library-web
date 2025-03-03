<template>
  <div
    @click="toggleDropdown"
    class="tw-component-container w-full bg-white dark:bg-dark-mode-inside shadow-md rounded-lg border border-gray-200 dark:border-gray-600 transition duration-500 ease-in-out hover:scale-101 animate-fade-in relative cursor-pointer"
  >
    <div class="flex flex-row w-full">
      <img
        :src="`${config.OPENLIBRARY_COVER_URL}${book.coverId}.jpg`"
        alt="Cover"
        class="object-contain decoration-0 mr-3 w-[80px] max-[48px]:hidden"
      />
      <div class="flex flex-col flex-grow">
        <span class="text-xl font-semibold dark:text-title-dark-mode-text"
          >{{ book.title }} {{ book.publishYear ? ` (${book.publishYear})` : '' }}
          {{ book.authors && book.authors.length > 0 ? ` by ${book.authors[0]}` : '' }}</span
        >
        <div class="flex flex-row max-sm:flex-col max-sm:mt-2 sm:space-x-8 max-sm:space-y-2">
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title"
              >Publisher: <span class="tw-book-entry-info-value">{{ book.publisher }}</span></span
            >
            <span class="tw-book-entry-info-title"
              >Format: <span class="tw-book-entry-info-value">{{ book.format }}</span></span
            >
            <span class="tw-book-entry-info-title"
              >Language: <span class="tw-book-entry-info-value">
                {{ book.languages && book.languages.length > 0 ? `${book.languages[0].toUpperCase()}` : 'No language found' }}</span></span
            >
          </div>
          <div class="flex flex-col">
            <span class="tw-book-entry-info-title"
              >ISBN: <span class="tw-book-entry-info-value">{{ book.isbn }}</span></span
            >
            <span v-if="isSearchBook || deadline != null" class="tw-book-entry-info-title"
              >Owner: <span class="tw-book-entry-info-value">{{ ownBook.owner.name }} <span class="tw-book-entry-info-value" id="ratingDetails"><font-awesome-icon :icon="faStar" id="starIcon" class="text-yellow-500"/>{{ mockRatingValue }} ({{ mockRatingNumber }})</span></span></span
            >
            <span v-if="deadline != null" class="tw-book-entry-info-title font-semibold"
              >Deadline: <span class="tw-book-entry-info-value">{{ deadline }}</span></span
            >
            <span v-if="!isNewBook && deadline == null" class="tw-book-entry-info-title"
              >Status:
              <span :class="{ 'text-green-500': ownBook.status == 'AVAILABLE', 'text-red-500': ownBook.status == 'UNAVAILABLE' }">
                {{ ownBook.status }}</span
              ></span
            >
          </div>
          <div v-if="!isNewBook && ownBook.status && deadline == null" class="flex flex-col">
            <span class="tw-book-entry-info-title"
              >Lendable:
              <span
                :class="{ 'text-green-500': ownBook.lendable, 'text-red-500': !ownBook.lendable }"
              >
                {{ ownBook.lendable ? 'Yes' : 'No' }}
              </span>
            </span>

            <span class="tw-book-entry-info-title">
              Exchangeable:
              <span
                :class="{
                  'text-green-500': ownBook.exchangeable,
                  'text-red-500': !ownBook.exchangeable,
                }"
              >
                {{ ownBook.exchangeable ? 'Yes' : 'No' }}
              </span>
            </span>

            <span class="tw-book-entry-info-title">
              Giftable:
              <span
                :class="{ 'text-green-500': ownBook.giftable, 'text-red-500': !ownBook.giftable }"
              >
                {{ ownBook.giftable ? 'Yes' : 'No' }}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center ml-2">
        <font-awesome-icon
          :icon="faChevronRight"
          class="tw-icon"
          :class="{ 'rotate-90': dropdownOpen }"
        ></font-awesome-icon>
      </div>
    </div>
    <div
      v-bind:class="{
        'max-h-0 overflow-hidden': !dropdownOpen,
        'max-h-40 overflow-hidden': dropdownOpen,
      }"
      class="transition-all duration-300 ease-in-out w-full"
    >
      <div
        class="flex flex-row w-full mt-2 space-x-16 max-md:space-x-6 ml-24 max-sm:space-x-0 max-sm:flex-col max-sm:space-y-4 max-sm:justify-center max-sm:ml-0"
      >
        <button v-if="!isWishlist && isSearchBook && false" class="btn-primary btn-gray rounded-2xl">
          Add to wishlist
        </button>
        <button v-if="isSearchBook && ownBook.status === 'AVAILABLE' && props.ownBook.owner.id !== userStore.user.id" @click="openPopup" class="btn-primary btn-green rounded-2xl">Send Request</button>
        <button
          v-if="isSearchBook"
          @click="handleShowOnMap"
          class="btn-primary btn-green rounded-2xl"
        >
          Show on Map
        </button>
        <button
          v-if="deadline != null"
          @click="handleReturnBook"
          :disabled = "returnedBook"
          class="btn-primary btn-green rounded-2xl"
        >
          {{ returnedBookButtonText }}
        </button>
        <button
          v-if="isMyBook"
          @click="handleEditState"
          :disabled="ownBook.status == 'LENT'"
          class="edit-button btn-primary btn-green rounded-2xl"
        >
          Edit State
        </button>
        <button
          v-if="isMyBook"
          @click="handleDelete"
          class="delete-button btn-primary btn-gray rounded-2xl"
        >
          Delete
        </button>
        <button
          v-if="isNewBook"
          @click="handleAdd"
          class="add-btn-of-book btn-primary btn-green rounded-2xl"
        >
          Add to My Books
        </button>
        <button
          v-if="ownBook?.lendingState?.isReturned"
          @click="handleConfirmReturnBook"
          class="confirm-return-btn-of-book btn-primary btn-green rounded-2xl"
        >
          Confirm Return of Book
        </button>
      </div>
    </div>
  </div>
  <SendRequestPopup ref="requestPopup" :book="ownBook"/>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import config from '@/config.json';
import SendRequestPopup from './SendRequestPopup.vue';
import { useUserStore } from '@/stores/user.ts';
import { userService } from '@/services/UserService.ts';

const emit = defineEmits(['showOnMapClicked', 'handleAction', 'handleAdd', 'handleReturnBook']);

const requestPopup = ref(null);
const userStore = useUserStore();
const returnedBookButtonText = ref("Returned Book")
const returnedBook = ref(false)
const mockRatingValue = ref(4.5);
const mockRatingNumber = ref(102);

const props = defineProps({
  book: {
    type: Object, //Book
    required: true,
  },
  ownBook: {
    type: Object, //OwnBook
    required: false,
  },
  isWishlist: {
    type: Boolean,
    default: false,
  },
  isSearchBook: {
    type: Boolean,
    default: false,
  },
  isMyBook: {
    type: Boolean,
    default: false,
  },
  isNewBook: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: String,
    default: null,
  },
});

const dropdownOpen = ref(props.isNewBook);

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function handleShowOnMap() {
  emit('showOnMapClicked', props.ownBook);
}

function handleEditState() {
  emit('handleAction', props.ownBook, 'EDIT');
}

function handleDelete() {
  emit('handleAction', props.book, 'DELETE');
}

function handleAdd() {
  emit('handleAdd', props.book);
}

function handleConfirmReturnBook(){
  emit('handleAction', props.ownBook, "CONFIRM_RETURN")
}

function handleReturnBook(){
  returnedBook.value = true;
  returnedBookButtonText.value = "Wait for owner confirmation"
  emit("handleReturnBook", props.deadline, props.ownBook)
}

// Function to open the popup
const openPopup = () => {
  requestPopup.value.show();
};

const fetchOwnerDetails = async () => {
  if (props.ownBook && props.ownBook.owner.id) {
    try {
      const ownerDetails = await userService.getUserById(props.ownBook.owner.id);
      console.debug("Fetched owner: ", ownerDetails.data.username);
      props.ownBook.owner = { ...props.ownBook.owner, username: ownerDetails.data.username };
    } catch (error) {
      console.error('Error fetching owner details:', error);
    }
  }
};

onMounted(() => {
  if(props.isSearchBook){
    fetchOwnerDetails();
  }
});
</script>
