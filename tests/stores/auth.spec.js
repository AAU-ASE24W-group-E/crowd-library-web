import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';

describe('useAuthStore', () => {
  let authStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuthStore();
  });

  it('should initialize with null token and not logged in', () => {
    expect(authStore.token).toBeNull();
    expect(authStore.isLoggedIn).toBe(false);
  });

  it('should set the token and update isLoggedIn to true', () => {
    const testToken = 'test-token';
    authStore.setToken(testToken);

    expect(authStore.token).toBe(testToken);
    expect(authStore.isLoggedIn).toBe(true);
  });

  it('should clear the token and update isLoggedIn to false', () => {
    const testToken = 'test-token';
    authStore.setToken(testToken);

    authStore.clearToken();

    expect(authStore.token).toBeNull();
    expect(authStore.isLoggedIn).toBe(false);
  });
});
