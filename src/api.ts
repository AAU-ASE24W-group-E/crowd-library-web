import axios from 'axios';
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'
import { Snackbar } from './utils/snackbar';
import { SnackbarType } from './enums/snackbar';

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
    console.log(authStore.token);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    const router = useRouter();
    if (error.response?.status === 401) {
      console.warn('Token invalid, please login again...');
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
  }
);

export default apiClient;
