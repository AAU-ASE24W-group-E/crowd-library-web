import { createApiClient } from '@/services/ApiFactory.ts';

export const userApiService = createApiClient(import.meta.env.VITE_SERVICE_USER_URL)
export const lendingApiService = createApiClient(import.meta.env.VITE_SERVICE_LENDING_URL)
export const bookApiService = createApiClient(import.meta.env.VITE_SERVICE_BOOK_URL)
