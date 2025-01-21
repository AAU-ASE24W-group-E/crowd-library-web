<template>
  <div class="modal-backdrop">
    <div class="modal-container">
      <div v-if="popupType == 'EDIT'">
        <div class="modal-header">
          <h2 class="modal-title">Edit the state of your book</h2>
          <button @click="closeModal" class="close-button">✕</button>
        </div>

        <div class="modal-body">
          <div class="book-title">{{ popupBook.title }}</div>
          <VueToggles
            v-model="editable.status.value"
            :height="30"
            :width="140"
            checkedText="Available"
            uncheckedText="Unavailable"
            checkedBg="green"
            uncheckedBg="grey"
            @click="onAvailableChanged"
            class="available-toggle"
          />
          <div v-for="(toggle, key) in editable" :key="key" class="flex justify-center items-center">
            <div v-if="toggle &&  toggle?.checkedText">
              <VueToggles
                v-model="editable[key].value"
                :height="30"
                :width="140"
                :checkedText="toggle.checkedText"
                :uncheckedText="'Not ' + toggle.checkedText"
                checkedBg="#6584ad"
                uncheckedBg="grey"
                class="flag-toggle text-center"
                :id="'toggle_' + key"
                @click="onToggleChange"
                :disabled="!editable.status.value"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="popupType == 'DELETE'">
        <div class="modal-header">
          <h2 class="modal-title">Are you sure you want to delete your book?</h2>
          <button @click="closeModal" class="close-button">✕</button>
        </div>

        <div class="modal-body">
          {{ popupBook.title }}
        </div>
      </div>

      <div class="modal-footer">
        <button @click="closeModal" class="cancel-popup-btn btn-primary btn-gray rounded-2xl">Cancel</button>
        <button @click="okButtonClicked" class="ok-popup-btn btn-primary btn-green rounded-2xl ok-button">
          {{ popupType }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueToggles from 'vue-toggles';
import { ref } from 'vue';

export default {
  components: {
    VueToggles,
  },
  emits: ['close'],
  props: {
    popupType: {
      type: String,
      default: 'EDIT',
    },
    popupBook: {
      type: Object,
    },
  },
  setup(props) {
    console.log(props.popupBook.status)
    let bookStatus = false;
    if(props.popupBook.status == "AVAILABLE") bookStatus = true;
    const editable = ref({
      status: {
        value: bookStatus
      },
      lendable: {
        value: props.popupBook.lendable,
        checkedText: "Lendable"
      },
      exchangeable:{
        value: props.popupBook.exchangeable,
        checkedText: "Exchangeable"
      },
      giftable: {
        value: props.popupBook.giftable,
        checkedText: "Giftable"
      }
    });

    // Return reactive properties to make them accessible in the template
    return {
      editable,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close', false);
    },
    okButtonClicked() {
      this.$emit('close', true, this.popupBook, this.editable);
    },

    onAvailableChanged(){
      for(let key of Object.keys(this.editable)){
        this.editable[key].value = this.editable.status.value;
      }
    },

    onToggleChange(){
      let all_flags_false = true;
      for(let key of Object.keys(this.editable)){
        if(key == "status") continue;
        if(this.editable[key].value == true) all_flags_false = false;
      }
      if(all_flags_false) this.editable.status.value = false;
    }
  },
};
</script>

<style scoped>
.modal-backdrop {
  @apply fixed
    inset-0
    bg-gray-800
    dark:bg-gray-500
    dark:bg-opacity-50
    bg-opacity-50
    flex
    items-center
    justify-center
    z-50;
}

.modal-container {
  @apply bg-white
  dark:bg-dark-mode-inside
  rounded-lg 
  shadow-lg
  w-1/3
  max-sm:w-[90%]
  max-w-lg;
}

.modal-header {
  @apply flex
  justify-between
  items-center
  border-b
  px-6
  py-4;
}

.flag-toggle{
  @apply ml-5 mt-5;
}

.available-toggle{
  @apply ml-5 mt-5;
}

.ok-button {
  @apply ml-5 ;
}

.modal-title {
  @apply text-lg 
  font-semibold
  dark:text-white;
}

.book-title {
  @apply text-lg 
  font-semibold
  dark:text-white;
}

.close-button {
  @apply text-gray-500
  hover:text-gray-700;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.modal-body {
  
  @apply px-6
  py-4
  flex flex-col items-center justify-center
  dark:text-white;
}

.modal-footer {
  @apply flex
  justify-end
  border-t px-6 py-4;
}
</style>
