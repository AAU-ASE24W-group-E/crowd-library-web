import { bookApiService } from '@/services/clients.ts'

export interface AvailableBooksQuery {
  latitude: number
  longitude: number
  distance?: number
  quickSearch?: string
  author?: string
  title?: string
  lendable?: boolean
  exchangeable?: boolean
  giftable?: boolean
  offset?: number
  limit?: number
}

class BookService {
  async getAvailableBooks(query: AvailableBooksQuery) {
    console.log('fetching available books with query:', query);
    return await bookApiService.get('/available-book', {params: query});
  }
}

export const bookService = new BookService();
