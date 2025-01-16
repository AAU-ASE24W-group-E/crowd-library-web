import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UserLibraryMyBooks from '@/components/user-library/UserLibraryMyBooks.vue';
import UserLibraryAddBook from '@/components/user-library/UserLibraryAddBook.vue';
import BookEntry from '@/components/BookEntry.vue';
import { nextTick } from 'vue'; 
import BookLibraryPopup from '@/components/user-library/BookLibraryPopup.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

describe('UserLibraryMyBooks', () => {
  let wrapper;

  const mybooks = [
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
      status: true, // Available
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
      status: false, // Unavailable
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
      status: true, // Available
      distance: 0,
      owner: {
        id: 'Owner3',
        name: 'Owner3',
        latitude: 46.622305,
        longitude: 14.272915,
      },
    }
  ];

  beforeEach(() => {
    wrapper = mount(UserLibraryMyBooks, {
      props: {
        mybooks: mybooks,
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the book list with BookEntry components', () => {
    const bookEntries = wrapper.find('.my-book-list').findAllComponents(BookEntry);
    
    expect(bookEntries.length).toBe(mybooks.length);
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
});
