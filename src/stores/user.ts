import { defineStore } from 'pinia';
import type { User } from '@/interfaces/user.ts';
import { ref, watch } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user_data') || 'null'));

  const setUser = (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData };
    } else {
      user.value = userData as User;
    }
    localStorage.setItem('user_data', JSON.stringify(userData));
  };

  const setAddress = (latitude: number, longitude: number) => {
    if (user.value) {
      user.value.address = {
        latitude: latitude,
        longitude: longitude,
      };
      localStorage.setItem('user_data', JSON.stringify(user.value));
    }
  };


  const clearUser = () => {
    user.value = null;
    localStorage.removeItem('user_data');
  };

  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem('user_data', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user_data');
    }
  }, { deep: true });

  return {
    user,
    setUser,
    setAddress,
    clearUser,
  };
});
