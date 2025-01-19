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

  it('should call GET /book without optional parameters to find books', async () => {
    const mockResponse = [mockBook];

    bookApiService.get.mockResolvedValue({ data: mockResponse });

    const response = await bookService.findBooks();

    expect(bookApiService.get).toHaveBeenCalledWith('/book', {
      params: new URLSearchParams({
        maxResults: '10',
      }),
    });

    expect(response.data).toEqual(mockResponse);
  });


  it('should call findBooks twice and merge results for quick search', async () => {
    const mockResponseByTitle = [mockBook];
    const mockResponseByAuthor = [
      {
        ...mockBook,
        book: { ...mockBook.book, id: '2', title: 'Another Title' },
      },
    ];
    const quicksearch = 'The Forgotten Forest';

    bookService.findBooks = vi
      .fn()
      .mockResolvedValueOnce({ data: mockResponseByTitle })
      .mockResolvedValueOnce({ data: mockResponseByAuthor });

    const response = await bookService.findBookByQuicksearch(quicksearch);

    expect(bookService.findBooks).toHaveBeenCalledTimes(2);
    expect(bookService.findBooks).toHaveBeenCalledWith(quicksearch, undefined);
    expect(bookService.findBooks).toHaveBeenCalledWith(undefined, quicksearch);

    expect(response.length).toEqual(1);
  });

  it('should deduplicate books by ID in quick search', async () => {
    const duplicateBook = { ...mockBook, book: { ...mockBook.book } };
    const mockResponseByTitle = [mockBook];
    const mockResponseByAuthor = [duplicateBook];

    const quicksearch = 'The Forgotten Forest';


    bookService.findBooks = vi
      .fn()
      .mockResolvedValueOnce({ data: mockResponseByTitle })
      .mockResolvedValueOnce({ data: mockResponseByAuthor });

    const response = await bookService.findBookByQuicksearch(quicksearch);

    expect(bookService.findBooks).toHaveBeenCalledTimes(2);
    expect(bookService.findBooks).toHaveBeenCalledWith(quicksearch, undefined);
    expect(bookService.findBooks).toHaveBeenCalledWith(undefined, quicksearch);

    expect(response).toEqual([mockBook]);
  });

  it('should handle empty results for quick search', async () => {
    const quicksearch = 'Nonexistent Book';

    bookService.findBooks = vi
      .fn()
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [] });

    const response = await bookService.findBookByQuicksearch(quicksearch);

    expect(bookService.findBooks).toHaveBeenCalledTimes(2);
    expect(bookService.findBooks).toHaveBeenCalledWith(quicksearch, undefined);
    expect(bookService.findBooks).toHaveBeenCalledWith(undefined, quicksearch);

    expect(response).toEqual([]);
  });
});
