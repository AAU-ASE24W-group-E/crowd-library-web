import { createApiClient } from '@/services/ApiFactory.ts';

export const userService = createApiClient(import.meta.env.VITE_SERVICE_USER_URL)
export const lendingService = createApiClient(import.meta.env.VITE_SERVICE_LENDING_URL)
export const bookService = createApiClient(import.meta.env.VITE_SERVICE_BOOK_URL)
