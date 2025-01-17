import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import BookEntry from "@/components/BookEntry.vue";

const mockBook = {
  title: "Sample Book",
  year: 2021,
  author: "John Doe",
  publisher: "Sample Publisher",
  format: "Hardcover",
  language: "English",
  ISBN: "123-4567890123",
  owner: "Library",
  isAvailable: true,
  isLendable: true,
  isExchangeable: false,
  isGiftable: true,
  status: "Available",
};


const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('BookEntry', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BookEntry, {
      props: {
        book: mockBook,
        isWishlist: false,
        isSearchBook: true
      },
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders wishlist button when isWishlist is false", async () => {
    expect(wrapper.find("button.btn-primary.btn-gray").exists()).toBe(true);

    await wrapper.setProps({ isWishlist: true });
    expect(wrapper.find("button.btn-primary.btn-gray").exists()).toBe(false);
  });

  it("renders 'No' with red text for unavailable attributes", async () => {
    await wrapper.setProps({
      book: { ...mockBook, isLendable: false, isExchangeable: false, isGiftable: false },
    });

    const lendableSpan = wrapper.find(".tw-book-entry-info-title span.text-red-500");
    expect(lendableSpan.text()).toBe("No");

    const exchangeableSpan = wrapper.find(".tw-book-entry-info-title span.text-red-500");
    expect(exchangeableSpan.text()).toBe("No");

    const giftableSpan = wrapper.find(".tw-book-entry-info-title span.text-red-500");
    expect(giftableSpan.text()).toBe("No");
  });
});
