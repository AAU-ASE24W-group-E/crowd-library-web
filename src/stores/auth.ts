import { defineStore } from 'pinia';
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const isLoggedIn = computed(() => token.value !== null);

  const initializeToken = () => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      token.value = savedToken;
    }
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem('auth_token');
  };

  initializeToken();

  return {
    token,
    isLoggedIn,
    setToken,
    clearToken,
  };
});
