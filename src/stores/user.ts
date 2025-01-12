import { defineStore } from 'pinia'
import type { User } from '@/interfaces/user.ts'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null> ();
  const setUser = (userData: User) => {
    user.value = userData;
  }

  const getUser = () => {
    return user.value;
  }

  const clearUser = () => {
    user.value = null;
  }


  return{
    user,
    setUser,
    getUser,
    clearUser
  };

})
