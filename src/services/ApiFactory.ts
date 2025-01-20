import axios, { type AxiosInstance } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

export function createApiClient(baseURL: string): AxiosInstance {
  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const authStore = useAuthStore();
      const router = useRouter();

      if (error.response?.status === 401) {
        console.warn('Token expired or invalid. Redirecting to Login...');
        authStore.clearToken();
        router.push('/login');
      }

      if (error.response?.status === 404) {
        Snackbar.showSnackbar('Not found...', SnackbarType.WARN, 15)
      }

      if (error.response?.status === 400) {
        Snackbar.showSnackbar('User error - ' + error.response?.data?.message, SnackbarType.WARN, 15)
      }

      return Promise.reject(error);
    },
  );

  return apiClient;
}
