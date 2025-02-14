import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UserLibraryMyBooks from '@/components/user-library/UserLibraryMyBooks.vue';
import BookEntry from '@/components/BookEntry.vue';
import UserLibraryAddBook from '@/components/user-library/UserLibraryAddBook.vue';

import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { bookService } from '@/services/BookService';
import { useUserStore } from '@/stores/user';

import BookLibraryPopup from '@/components/user-library/BookLibraryPopup.vue';
import { createPinia, setActivePinia } from 'pinia';
const mock_books = [
  {
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
    status: "AVAILABLE", // Available
    distance: 0,
    owner: {
      id: 'Owner1',
      name: 'Owner1',
      latitude: 46.617415,
      longitude: 14.263625,
    },
  },
  {
    book: {
      id: '2',
      title: 'Whispers of the Sea',
      isbn: '2233445566',
      publisher: 'Ocean Breeze Press',
      publishYear: 2020,
      coverId: '14625766-L',
      edition: 'First Edition',
      format: 'Hardcover',
      authors: ['John Saltsworth'],
      languages: ['EN'],
    },
    lendable: false,
    giftable: false,
    exchangeable: true,
    status: "UNAVAILABLE", // Unavailable
    distance: 0,
    owner: {
      id: 'Owner2',
      name: 'Owner2',
      latitude: 46.619025,
      longitude: 14.265755,
    },
  },
  {
    book: {
      id: '3',
      title: 'A Dance in the Rain',
      isbn: '3344556677',
      publisher: 'Rainfall Publishing',
      publishYear: 2019,
      coverId: '14625767-L',
      edition: 'Second Edition',
      format: 'Paperback',
      authors: ['Elena Storm'],
      languages: ['ES'],
    },
    lendable: true,
    giftable: false,
    exchangeable: false,
    status: "AVAILABLE", // Available
    distance: 0,
    owner: {
      id: 'Owner3',
      name: 'Owner3',
      latitude: 46.622305,
      longitude: 14.272915,
    },
  },
];

vi.mock('@/stores/user', () => ({
  useUserStore: () => {
    return{
      setUser: vi.fn(),
      user: { id: "user" }
    }
  },
}));


vi.mock('@/services/BookService', () => ({
  bookService: {
    createBookOwnership: vi.fn(() => Promise.resolve([])),
    findBookByQuicksearch: vi.fn(() => Promise.resolve(mock_books)),
    importBookByIsbn: vi.fn(() => Promise.resolve({data: mock_books[0]})),
    findOwnBooks: vi.fn(() => Promise.resolve({data: mock_books})),
    updateBookFlags : vi.fn(() => Promise.resolve({}))
    },
}));

vi.mock('@/services/Snackbar', () => ({
  showSnackbar: vi.fn(),
}));

describe('UserLibraryMyBooks', () => {
  let wrapper;
  let addComponent;
  let popUpComponent;
  let pinia;

  const createComponent = () => {
    wrapper = mount(UserLibraryMyBooks, {
      global: {
        plugins: [pinia],
      },
      components: {
        UserLibraryAddBook,
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    createComponent();
    wrapper.vm.mybooks = mock_books;
    addComponent = wrapper.findComponent(UserLibraryAddBook);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('renders the book list with BookEntry components', () => {
    const bookEntries = wrapper.find('.my-book-list').findAllComponents(BookEntry);
    expect(bookEntries.length).toBe(wrapper.vm.mybooks.length);
  });

  it('renders the book list with BookEntry components - empty text is not there', () => {
    const emptyText = wrapper.find('.library-empty-text');
    expect(emptyText.exists()).toBe(false);
  });

  it('shows the "Add Book" button initially', () => {
    const addButton = wrapper.find('.add-book-btn');
    expect(addButton.exists()).toBe(true);
  });

  it('toggles the "Add Book" form visibility when the button is clicked', async () => {
    const addButton = wrapper.find('.add-book-btn');
    await addButton.trigger('click');
    const addBookForm = wrapper.findComponent(UserLibraryAddBook);
    expect(addBookForm.isVisible()).toBe(true);
  });

  it('displays "Cancel" button when the "Add Book" form is visible', async () => {
    const addButton = wrapper.find('.add-book-btn');
    await addButton.trigger('click');
    const cancelButton = wrapper.find('.cancel-adding-btn');
    expect(cancelButton.isVisible()).toBe(true);
  });

  it('hides the "Cancel" button when the "Add Book" form is hidden', async () => {
    const cancelButton = wrapper.find('.cancel-adding-btn');
    expect(cancelButton.isVisible()).toBe(false);
  });

  it('calls toggleAddBook method with cancel argument when cancel button is clicked', async () => {
    const toggleAddBookSpy = vi.spyOn(wrapper.vm, 'toggleAddBook');
    const addButton = wrapper.find('.add-book-btn');
    await addButton.trigger('click');

    const cancelButton = wrapper.find('.cancel-adding-btn');
    await cancelButton.trigger('click');
    expect(toggleAddBookSpy).toHaveBeenCalledWith('cancel');
    expect(wrapper.vm.showAddBook).toBe(false);
  });

  it('shows import button when add button is clicked', async () => {
    const addButton = wrapper.find('.add-book-btn');
    await addButton.trigger('click');

    const importButton = wrapper.find('.import-btn');
    expect(importButton.isVisible()).toBe(true);
  });

  it('does not import anything if isbn input is empty', async () => {
    const addButton = wrapper.find('.add-book-btn');
    await addButton.trigger('click');

    const isbnInput = wrapper.find('#isbn-input');
    await isbnInput.setValue('978-3-453-32198-4');

    const importButton = wrapper.find('.import-btn');
    expect(importButton.isVisible()).toBe(true);
  });

  it('triggers the BookLibraryPopup component when a book action is triggered', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    expect(wrapper.vm.popupBookRef == null).toBe(false);
    expect(wrapper.vm.popupTypeRef).equals('EDIT');
    expect(wrapper.vm.showPopup).toBe(true);
  });

  it('triggers the BookLibraryPopup component and it shows cancel button', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    const cancelButton = wrapper.find('.cancel-popup-btn ');
    expect(cancelButton.isVisible()).toBe(true);
  });

  it('triggers the BookLibraryPopup component and it shows cancel button and it closes the popup', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    const cancelButton = wrapper.find('.cancel-popup-btn ');
    await cancelButton.trigger('click');

    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('triggers the BookLibraryPopup component and it shows ok button and it closes the popup correctly', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    const cancelButton = wrapper.find('.ok-popup-btn ');
    await cancelButton.trigger('click');

    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('sets the correct popup type when handleAction is called with a type', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');
    const popup = wrapper.findComponent(BookLibraryPopup);

    expect(popup.exists()).toBe(true);
    expect(popup.props().popupType).toBe('EDIT');
  });

  it('closes the popup and handles the action when handlePopUpClosed is called', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');
    const popup = wrapper.findComponent(BookLibraryPopup);

    expect(popup.exists()).toBe(true);

    await popup.vm.$emit('close', true, {});
    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('does not show the popup when handlePopUpClosed is called with actionFinished = false', async () => {
    const deleteButton = wrapper.find('.delete-button');
    await deleteButton.trigger('click');
    const popup = wrapper.findComponent(BookLibraryPopup);
    expect(popup.exists()).toBe(true);

    await popup.vm.$emit('close', false, {});
    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('does not trigger a search request when the search input is empty', async () => {
    const searchInput = wrapper.find('#search-input');
    await searchInput.setValue('');

    await addComponent.vm.handleSearch();
    expect(addComponent.vm.foundBooks).toEqual([]);
  });

  it('does not trigger a import request when the isbn input is empty', async () => {
    const isbnInput = wrapper.find('#isbn-input');
    await isbnInput.setValue('');

    await addComponent.vm.handleImport();
    expect(addComponent.vm.searchInput).toEqual(null);
  });


  it('successfully imports a book when handleImport is triggered with a valid ISBN', async () => {
    const isbnInput = wrapper.find('#isbn-input');
    await isbnInput.setValue('978-3-453-32198-4');
    const showSnackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');
    const importBookByIsbnSpy = vi.spyOn(bookService, 'importBookByIsbn').mockResolvedValue({ data: mock_books[0] });
    
    await addComponent.vm.handleImport();
    expect(importBookByIsbnSpy).toHaveBeenCalledWith('978-3-453-32198-4');
    expect(addComponent.vm.searchInput).toBe(mock_books[0].title);
    expect(showSnackbarSpy).toHaveBeenCalledWith('Successfully imported ' + mock_books[0].title, expect.anything());
    
    const updatedIsbnInput = wrapper.find('#isbn-input');
    expect(updatedIsbnInput.element.value).toBe('');
  });

  it('triggers handleSearch when Enter key is pressed in the search input', async () => {
    const searchInput = wrapper.find('#search-input');
    const handleSearchSpy = vi.spyOn(addComponent.vm, 'handleSearch');
    await searchInput.trigger('keyup.enter');
  
    expect(handleSearchSpy).toHaveBeenCalled();
    expect(handleSearchSpy).toHaveBeenCalledWith(expect.anything());
  });

  it('successfully performs a book search and updates foundBooks.value', async () => {
    const inputValue = 'The Forgotten Forest';
    addComponent.vm.searchInput = inputValue;
    await addComponent.vm.handleSearch(inputValue);
    expect(bookService.findBookByQuicksearch).toHaveBeenCalledWith(inputValue);
  
    expect(addComponent.vm.foundBooks).toEqual(mock_books);
  });

  it('performs book search not finding anything', async () => {
    const inputValue = 'Not findable';
    bookService.findBookByQuicksearch.mockResolvedValue([]);

    addComponent.vm.searchInput = inputValue;
    await addComponent.vm.handleSearch(inputValue);
    expect(bookService.findBookByQuicksearch).toHaveBeenCalledWith(inputValue);
  
    expect(addComponent.vm.foundBooks).toEqual([]);
  });

  it('does not get error for one letter search', async () => {
    const searchInput = wrapper.find('#search-input');
    await searchInput.setValue('a');

    await addComponent.vm.handleSearch();
    expect(addComponent.vm.foundBooks).toEqual([]);
  });

  it('returns early if user ID is undefined', async () => {
    useUserStore().user = null;

    await wrapper.vm.handlePopUpClosed(true, mock_books[0], {});
    expect(bookService.updateBookFlags).not.toHaveBeenCalled();
    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('updates book flags successfully when popup type is EDIT', async () => {
    const editedFields = { lendable: false, giftable: true };

    await wrapper.vm.handlePopUpClosed(true, mock_books[0], editedFields);
    expect(wrapper.vm.showPopup).toBe(false);
  });

  it('set status false based on other flags being all false using onToggleChange', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    popUpComponent = wrapper.findComponent(BookLibraryPopup);
  
    popUpComponent.vm.editable.lendable.value = false;
    popUpComponent.vm.editable.giftable.value = false;
    popUpComponent.vm.editable.exchangeable.value = false;
  
    popUpComponent.vm.onToggleChange();
    expect(popUpComponent.vm.editable.status.value).toBe(false);
  });

  it('if status is set false other flags are set false', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    popUpComponent = wrapper.findComponent(BookLibraryPopup);
  
    popUpComponent.vm.editable.status.value = false;
  
    popUpComponent.vm.onAvailableChanged();
    expect(popUpComponent.vm.editable.giftable.value).toBe(false);
    expect(popUpComponent.vm.editable.lendable.value).toBe(false);
    expect(popUpComponent.vm.editable.exchangeable.value).toBe(false);
  });

  it('if status is set false other flags are set false', async () => {
    const editButton = wrapper.find('.edit-button');
    await editButton.trigger('click');

    popUpComponent = wrapper.findComponent(BookLibraryPopup);
  
    popUpComponent.vm.editable.status.value = true;
  
    popUpComponent.vm.onAvailableChanged();
    expect(popUpComponent.vm.editable.giftable.value).toBe(true);
    expect(popUpComponent.vm.editable.lendable.value).toBe(true);
    expect(popUpComponent.vm.editable.exchangeable.value).toBe(true);
  });

});
