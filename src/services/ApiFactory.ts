import axios, { type AxiosInstance } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

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

      return Promise.reject(error);
    },
  );

  return apiClient;
}
