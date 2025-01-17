import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';

describe('useUserStore', () => {
  let userStore;

  const mockUser = {
    id: 'id',
    email: 'johndoe@example.com',
    username: 'testuser',
    password: 'password123',
    address: null,
    role: 'user'
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();
  });


  it('should set the user', () => {
    userStore.setUser(mockUser);
    expect(userStore.user).toEqual(mockUser);
  });

  it('should get the user', () => {
    userStore.setUser(mockUser);
    const fetchedUser = userStore.getUser();
    expect(fetchedUser).toEqual(mockUser);
  });

  it('should clear the user', () => {
    userStore.setUser(mockUser);
    userStore.clearUser();
    expect(userStore.user).toBeNull();
  });
});
