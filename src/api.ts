import axios from 'axios';
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
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
      console.warn('Token abgelaufen oder ungültig, Weiterleitung zur Login-Seite...');
      authStore.clearToken();
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
