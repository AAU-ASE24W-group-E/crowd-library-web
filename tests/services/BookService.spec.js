import { describe, it, vi, expect, beforeEach } from 'vitest';
import { bookService } from '@/services/BookService';
import { bookApiService } from '@/services/clients.ts';

vi.mock('@/services/clients.ts', () => ({
  userApiService: {},
  lendingApiService: {},
  bookApiService: {
    post: vi.fn(),
    put: vi.fn(),
    get: vi.fn(),
  },
}));

describe('BookService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockBook = {
    book: {
      id: '1',
      title: 'The Forgotten Forest',
      isbn: '1122334455',
      publisher: 'Whispering Pines',
      publishYear: 2015,
      coverId: '14625765-L',
      edition: 'First Edition',
      format: 'Paperback',
      authors: ['Alice Morningstar'],
      languages: ['EN'],
    },
    lendable: true,
    giftable: true,
    exchangeable: false,
    status: true,
    distance: 0,
    owner: {
      id: 'Owner1',
      name: 'Owner1',
      latitude: 46.617415,
      longitude: 14.263625,
    },
  };

  const mockBookId = 'test-book-id';
  const mockOwnerId = 'test-owner-id';
  const mockIsbn = '1234567890';

  it('should call POST /book to create a book', async () => {
    bookApiService.post.mockResolvedValue({ data: mockBook });

    const response = await bookService.createBook(mockBook);

    expect(bookApiService.post).toHaveBeenCalledWith('/book', mockBook);
    expect(response.data).toEqual(mockBook);
  });

  it('should call PUT /book/isbn/:isbn to import a book by ISBN', async () => {
    bookApiService.put.mockResolvedValue({ data: mockBook });

    const response = await bookService.importBookByIsbn(mockIsbn);

    expect(bookApiService.put).toHaveBeenCalledWith(`/book/isbn/${mockIsbn}`);
    expect(response).toEqual(mockBook);
  });

  it('should call GET /book/:id to retrieve a book by ID', async () => {
    bookApiService.get.mockResolvedValue({ data: mockBook });

    const response = await bookService.getBook(mockBookId);

    expect(bookApiService.get).toHaveBeenCalledWith(`/book/${mockBookId}`);
    expect(response.data).toEqual(mockBook);
  });

  it('should call GET /book/isbn/:isbn to retrieve a book by ISBN', async () => {
    bookApiService.get.mockResolvedValue({ data: mockBook });

    const response = await bookService.getBookByIsbn(mockIsbn);

    expect(bookApiService.get).toHaveBeenCalledWith(`/book/isbn/${mockIsbn}`);
    expect(response.data).toEqual(mockBook);
  });

  it('should call GET /book with query parameters to find books', async () => {
    const mockResponse = [mockBook];
    const title = 'Test Book';
    const author = 'Test Author';
    const maxResults = 5;

    bookApiService.get.mockResolvedValue({ data: mockResponse });

    const response = await bookService.findBooks(title, author, maxResults);

    expect(bookApiService.get).toHaveBeenCalledWith('/book', {
      params: new URLSearchParams({
        title,
        author,
        maxResults: maxResults.toString(),
      }),
    });
    expect(response.data).toEqual(mockResponse);
  });

  it('should call POST /book-owner/:ownerId/book/:bookId to create book ownership', async () => {
    bookApiService.post.mockResolvedValue({ data: 'success' });

    const response = await bookService.createBookOwnership(mockBookId, mockOwnerId);

    expect(bookApiService.post).toHaveBeenCalledWith(
      `/book-owner/${mockOwnerId}/book/${mockBookId}`
    );
    expect(response.data).toEqual('success');
  });

  it('should call GET /book-owner/:ownerId/book to find owned books', async () => {
    const mockResponse = [mockBook];

    bookApiService.get.mockResolvedValue({ data: mockResponse });

    const response = await bookService.findOwnBooks(mockOwnerId);

    expect(bookApiService.get).toHaveBeenCalledWith(`/book-owner/${mockOwnerId}/book`);
    expect(response.data).toEqual(mockResponse);
  });

  it('should call GET /available-book with query parameters to retrieve available books', async () => {
    const mockResponse = [mockBook];
    const query = {
      latitude: 40.712776,
      longitude: -74.005974,
      distance: 10,
      quickSearch: 'Forest',
      lendable: true,
    };

    bookApiService.get.mockResolvedValue({ data: mockResponse });

    const response = await bookService.getAvailableBooks(query);

    expect(bookApiService.get).toHaveBeenCalledWith('/available-book', { params: query });
    expect(response.data).toEqual(mockResponse);
  });

  it('should call PUT /book-owner/:ownerId/book/:bookId to update book flags', async () => {
    const flags = {
      lendable: true,
      giftable: false,
      exchangeable: true,
      status: 'available',
    };

    bookApiService.put.mockResolvedValue({ data: 'success' });

    const response = await bookService.updateBookFlags(mockOwnerId, mockBookId, flags);

    expect(bookApiService.put).toHaveBeenCalledWith(
      `/book-owner/${mockOwnerId}/book/${mockBookId}`,
      flags
    );
    expect(response.data).toEqual('success');
  });
  
});
