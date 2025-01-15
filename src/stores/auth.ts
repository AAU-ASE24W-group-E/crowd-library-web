import { defineStore } from 'pinia';
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const isLoggedIn = computed(() => token.value !== null);

  const setToken = (newToken: string) => {
    token.value = newToken;
  };

  const clearToken = () => {
    token.value = null;
  };


  return {
    token,
    isLoggedIn,
    setToken,
    clearToken,
  };
});
