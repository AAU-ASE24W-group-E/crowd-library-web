import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import BookEntry from "@/components/BookEntry.vue";
import { createPinia, setActivePinia } from 'pinia';

const mockBook = {
  book: {
      title: "Sample Book",
      year: 2021,
      authors: ["John Doe"],
      publisher: "Sample Publisher",
      format: "Hardcover",
      languages: ["English"],
      ISBN: "123-4567890123",
  },
  owner: {
    name: "Library",
    latitude: 46.617415,
    longitude: 14.263625,
    id: 'Owner1'
  },
  status: true,
  lendable: true,
  exchangeable: false,
  giftable: true
};


const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('BookEntry', () => {
  let pinia;
  let wrapper;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(BookEntry, {
      props: {
        book: mockBook.book,
        ownBook: mockBook,
        isWishlist: false,
        isSearchBook: true
      },
      global: {
        plugins: [pinia],
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders wishlist button when isWishlist is false", async () => {
    expect(wrapper.find("button.btn-primary.btn-gray").exists()).toBe(false);  //TODO if implemented -> switch to true
    await wrapper.setProps({ isWishlist: true });
    expect(wrapper.find("button.btn-primary.btn-gray").exists()).toBe(false); //TODO if implemented -> switch to true
  });

  it("renders 'No' with red text for unavailable attributes", async () => {
    await wrapper.setProps({
      book: { ...mockBook, lendable: false, exchangeable: false, giftable: false },
    });

    const lendableSpan = wrapper.find(".tw-book-entry-info-title span.text-red-500");
    expect(lendableSpan.text()).toBe("No");

    const exchangeableSpan = wrapper.find(".tw-book-entry-info-title span.text-red-500");
    expect(exchangeableSpan.text()).toBe("No");

    const giftableSpan = wrapper.find(".tw-book-entry-info-title span.text-red-500");
    expect(giftableSpan.text()).toBe("No");
  });

  it("shows the rating details next to the user name", async () => {
    const starIcon = wrapper.find("#starIcon");
    expect(starIcon.exists()).toBe(true);
    expect(starIcon.classes().length).toBe(1);
    expect(starIcon.classes().at(0)).toBe("text-yellow-500");
  });
});
