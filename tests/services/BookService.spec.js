import { describe, it, vi, expect, beforeEach } from 'vitest';
import { bookService } from '@/services/BookService';
import apiClient from '@/api';

vi.mock('@/api', () => ({
  default: {
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
    status: true, // Available
    distance: 0,
    owner: {
      id: 'Owner1',
      name: 'Owner1',
      latitude: 46.617415,
      longitude: 14.263625,
    },
  };

  const mockBookId = 'test-book-id';
  const mockIsbn = '1234567890';

  it('should call POST /book to create a book', async () => {
    apiClient.post.mockResolvedValue({ data: mockBook });

    const response = await bookService.createBook(mockBook);

    expect(apiClient.post).toHaveBeenCalledWith('/book', mockBook);
    expect(response.data).toEqual(mockBook);
  });

  it('should call PUT /book/isbn/:isbn to import a book by ISBN', async () => {
    apiClient.put.mockResolvedValue({ data: mockBook });

    const response = await bookService.importBookByIsbn(mockIsbn);

    expect(apiClient.put).toHaveBeenCalledWith(`/book/isbn/${mockIsbn}`);
    expect(response.data).toEqual(mockBook);
  });

  it('should call GET /book/:id to retrieve a book by ID', async () => {
    apiClient.get.mockResolvedValue({ data: mockBook });

    const response = await bookService.getBook(mockBookId);

    expect(apiClient.get).toHaveBeenCalledWith(`/book/${mockBookId}`);
    expect(response.data).toEqual(mockBook);
  });

  it('should call GET /book/isbn/:isbn to retrieve a book by ISBN', async () => {
    apiClient.get.mockResolvedValue({ data: mockBook });

    const response = await bookService.getBookByIsbn(mockIsbn);

    expect(apiClient.get).toHaveBeenCalledWith(`/book/isbn/${mockIsbn}`);
    expect(response.data).toEqual(mockBook);
  });

  it('should call GET /book with query parameters to find books', async () => {
    const mockResponse = [mockBook];
    const title = 'Test Book';
    const author = 'Test Author';
    const maxResults = 5;

    apiClient.get.mockResolvedValue({ data: mockResponse });

    const response = await bookService.findBooks(title, author, maxResults);

    expect(apiClient.get).toHaveBeenCalledWith('/book', {
      params: new URLSearchParams({
        title,
        author,
        maxResults: maxResults.toString(),
      }),
    });
    expect(response.data).toEqual(mockResponse);
  });

  it('should call GET /book without optional parameters to find books', async () => {
    const mockResponse = [mockBook];

    apiClient.get.mockResolvedValue({ data: mockResponse });

    const response = await bookService.findBooks();

    expect(apiClient.get).toHaveBeenCalledWith('/book', {
      params: new URLSearchParams({
        maxResults: '10',
      }),
    });

    console.log(response.data);
    expect(response.data).toEqual(mockResponse);
  });
});
