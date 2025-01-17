import apiClient from '@/api.ts';

import type { Book } from '@/interfaces/book.ts';
import type { Owner } from '@/interfaces/owner.ts';

class BookService {
  readonly subdomain: string = '/book';
  readonly subdomain_owner: string = '/book-owner';

  async createBook(book: Book) {
    return await apiClient.post(`${this.subdomain}`, book);
  }

  async importBookByIsbn(isbn: string) {
    return (await apiClient.put(`${this.subdomain}/isbn/${isbn}`)).data;
    
  }

  async getBook(id: string) {
    return await apiClient.get(`${this.subdomain}/${id}`);
  }

  async getBookByIsbn(isbn: string) {
    return await apiClient.get(`${this.subdomain}/isbn/${isbn}`);
  }



  async findBookByQuicksearch(quicksearch:string) {
    const booksbyTitle = (await this.findBooks(quicksearch, undefined)).data;
    const booksByAuthor = (await this.findBooks(undefined, quicksearch)).data;
    return [...booksbyTitle, ...booksByAuthor].reduce((arr, item) => {
      if (!arr.some((existing:Book) => existing.id === item.id)) {
        arr.push(item);
      }
      return arr;
    }, []);
  }

  async findBooks(title?: string, author?: string, maxResults: number = 10) {
    const params = new URLSearchParams();
    if (title) params.append('title', title);
    if (author) params.append('author', author);
    params.append('maxResults', maxResults.toString());
    return await apiClient.get(`${this.subdomain}`, { params });
  }

  async createBookOwnership(book: Book, owner: Owner) {
    return await apiClient.post(`${this.subdomain_owner}/${owner.id}/book/${book.id}`);
  }

  
}

export const bookService = new BookService();
