import type { Book } from '@/interfaces/book.ts';
import { bookApiService } from '@/services/clients.ts';

class BookService {
  readonly subdomain: string = '/book';
  readonly subdomain_owner: string = '/book-owner';

  async createBook(book: Book) {
    return await bookApiService.post(`${this.subdomain}`, book);
  }

  async importBookByIsbn(isbn: string) {
    return (await bookApiService.put(`${this.subdomain}/isbn/${isbn}`)).data;

  }

  async getBook(id: string) {
    return await bookApiService.get(`${this.subdomain}/${id}`);
  }

  async getBookByIsbn(isbn: string) {
    return await bookApiService.get(`${this.subdomain}/isbn/${isbn}`);
  }



  async findBookByQuicksearch(quicksearch:string) {
    const booksbyTitle = (await this.findBooks(quicksearch)).data;
    const booksByAuthor = (await this.findBooks(null, quicksearch)).data;
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
    return await bookApiService.get(`${this.subdomain}`, { params });
  }

  async createBookOwnership(bookId: string, ownerId: string) {
    return await bookApiService.post(`${this.subdomain_owner}/${ownerId}/book/${bookId}`);
  }

  async findOwnBooks(ownerId: string) {
    return await bookApiService.get(`${this.subdomain_owner}/${ownerId}/book`);
  }
}

export const bookService = new BookService();
