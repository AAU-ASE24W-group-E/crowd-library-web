import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import UserLibrary from '@/components/user-library/UserLibrary.vue'; 
import UserLibraryMyBooks from '@/components/user-library/UserLibraryMyBooks.vue';

describe('UserLibrary', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UserLibrary, {
      global: {
        stubs: ['UserLibraryMyBooks'],
      },
      props: {
        mybooks: [
          {
            title: 'The Forgotten Forest',
            year: '2015',
            author: 'Alice Morningstar',
            publisher: 'Whispering Pines',
            format: 'Paperback',
            language: 'EN',
            ISBN: '1122334455',
            owner: 'Owner1',
            isAvailable: true,
            isLendable: true,
            isExchangeable: false,
            isGiftable: true,
            status: 'Available',
            lat: 46.617415,
            long: 14.263625,
          },
          {
            title: 'Whispers of the Sea',
            year: '2020',
            author: 'John Saltsworth',
            publisher: 'Ocean Breeze Press',
            format: 'Hardcover',
            language: 'EN',
            ISBN: '2233445566',
            owner: 'Owner1',
            isAvailable: false,
            isLendable: false,
            isExchangeable: true,
            isGiftable: false,
            status: 'Unavailable',
            lat: 46.619025,
            long: 14.265755,
          },
        ]
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders "My Books" tab by default', () => {
    const myBooksTab = wrapper.find('.tabs-header button.active-tab');
    expect(myBooksTab.text()).toBe('My Books');
  });

  it('changes active tab when a different tab is clicked', async () => {
    const borrowedBooksTab = wrapper.findAll('.tabs-header button').at(1);
    await borrowedBooksTab.trigger('click');

    const activeTab = wrapper.find('.tabs-header button.active-tab');
    expect(activeTab.text()).toBe('Borrowed Books');
  });

  it('renders UserLibraryMyBooks component when "My Books" tab is active', () => {
    const myBooksTabContent = wrapper.findComponent(UserLibraryMyBooks);
    expect(myBooksTabContent.exists()).toBe(true);
  });

  it('does not render UserLibraryMyBooks component when "BorrowedBooks" tab is active', async () => {
    const borrowedBooksTab = wrapper.findAll('.tabs-header button').at(1); // "BorrowedBooks"
    await borrowedBooksTab.trigger('click');

    const myBooksTabContent = wrapper.findComponent(UserLibraryMyBooks);
    expect(myBooksTabContent.exists()).toBe(false);
  });

  it('ensures that the tab switching changes the content display', async () => {
    const initialTabContent = wrapper.findComponent(UserLibraryMyBooks);
    expect(initialTabContent.exists()).toBe(true); // "My Books" tab is active initially

    const borrowedBooksTab = wrapper.findAll('.tabs-header button').at(1); // "BorrowedBooks"
    await borrowedBooksTab.trigger('click');
    
    const initialTabContentAfterSwitch = wrapper.findComponent(UserLibraryMyBooks);
    expect(initialTabContentAfterSwitch.exists()).toBe(false); // No content for BorrowedBooks tab
  });

  it('sets the correct active tab on clicking a button', async () => {
    const myBooksTabButton = wrapper.find('.tabs-header button:nth-child(1)');
    const borrowedBooksTabButton = wrapper.find('.tabs-header button:nth-child(2)');
    
    await borrowedBooksTabButton.trigger('click');
    expect(wrapper.vm.activeTab).toBe('borrowedBooksTab');

    await myBooksTabButton.trigger('click');
    expect(wrapper.vm.activeTab).toBe('myBooksTab');
  });
});
