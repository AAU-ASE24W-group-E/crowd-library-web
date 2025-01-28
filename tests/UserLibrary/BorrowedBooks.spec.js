import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BorrowedBooks from '@/components/user-library/UserLibraryBorrowedBooks.vue';
import BookEntry from '@/components/BookEntry.vue';
import { lendingService } from '@/services/LendingService';
import { bookService } from '@/services/BookService';
import { Snackbar } from '@/utils/snackbar.ts';
import { LendingStatus } from '@/enums/lendingStatus';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user';

vi.mock('@/services/LendingService', () => ({
  lendingService: {
    getLendingsByReaderIdAndStatus: vi.fn(),
    updateLendingStatus: vi.fn(),
  },
}));

const mockBooks = [
  {
    deadline: '2025-12-31',
    lendingId: 'lending1',
    book: { coverId: 'OL7440033M-S', title: 'Sample Book', id: 'book1' },
    owner: { name: 'Test User' },
  },
];

const mock_lendings = [
  {
    id: '1',
    bookId: '1',
    ownerId: 'Owner1',
    lendingMeeting: {
      deadline: '2025-03-15T10:00:00',
    },
  },
  {
    id: '2',
    bookId: '2',
    ownerId: 'Owner2',
    lendingMeeting: {
      deadline: '2025-04-10T12:00:00',
    },
  },
];

vi.mock('@/services/BookService', () => ({
  bookService: {
    getAvailableBook: vi.fn(() => Promise.resolve(mockBooks)),
  },
}));

vi.mock('@/utils/snackbar.ts', () => ({
  Snackbar: {
    showSnackbar: vi.fn(),
  },
}));

vi.mock('@/stores/user', () => ({
  useUserStore: () => ({
    user: { id: 'test-user' },
  }),
}));

describe('UserLibraryBorrowedBooks.vue', () => {
  let wrapper;
  let pinia;

  vi.mock('@/services/LendingService', () => ({
    lendingService: {
      getLendingsByReaderIdAndStatus: vi.fn(() => Promise.resolve({ data: mock_lendings })),
    },
  }));

  const createWrapper = () => {
    wrapper = mount(BorrowedBooks, {
      global: {
        plugins: [pinia],
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    Snackbar.showSnackbar.mockReset();
    createWrapper();
  });

  it('refreshBorrowedBookList fetches borrowed books and updates the list', async () => {
    await wrapper.vm.refreshBorrowedBookList();

    expect(lendingService.getLendingsByReaderIdAndStatus).toHaveBeenCalledWith(
      'test-user',
      LendingStatus.BORROWED
    );
    expect(bookService.getAvailableBook).toHaveBeenCalledWith('Owner1', '1');
  });

  it('renders empty text when there are no borrowed books', async () => {
    bookService.getAvailableBook.mockResolvedValue({ data: [] });
    wrapper.vm.myBorrowedBooks = [];
    await wrapper.vm.$nextTick();

    const emptyText = wrapper.find('.library-empty-text');
    expect(emptyText.exists()).toBe(true);
    expect(emptyText.text()).toBe('You currently do not have any borrowed books.');
  });
});
