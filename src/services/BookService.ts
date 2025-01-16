import apiClient from '@/api.ts';

import type { Book } from '@/interfaces/book.ts';
import type { OwnBook } from '@/interfaces/ownBook.ts';

class BookService {
  readonly subdomain: string = '/book';

  async createBook(book: Book) {
    return await apiClient.post(`${this.subdomain}`, book);
  }

  async importBookByIsbn(isbn: string) {
    return await apiClient.put(`${this.subdomain}/isbn/${isbn}`);
  }

  async getBook(id: string) {
    return await apiClient.get(`${this.subdomain}/${id}`);
  }

  async getBookByIsbn(isbn: string) {
    return await apiClient.get(`${this.subdomain}/isbn/${isbn}`);
  }

  async findBooks(title?: string, author?: string, maxResults: number = 10) {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (author) params.append('author', author);
    params.append('maxResults', maxResults.toString());
    
    return await apiClient.get(`${this.subdomain}`, { params });
  }
}

export const bookService = new BookService();
