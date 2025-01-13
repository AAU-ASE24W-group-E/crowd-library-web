import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RequestEntry from '@/components/RequestEntry.vue';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

const mockRequest = {
  from: 'User3',
  to: 'User2',
  for: 'Lending',
  place: '-',
  date: '-',
  book: {
    title: 'Whispers of the Sea',
    year: '2020',
    author: 'John Saltsworth',
    publisher: 'Ocean Breeze Press',
    format: 'Hardcover',
    language: 'EN',
    ISBN: '2233445566',
    owner: 'Owner2',
    lat: 46.619025,
    long: 14.265755,
  },
};

describe('RequestEntry', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RequestEntry, {
      props: {
        request: mockRequest,
        isWishlist: false,
      },
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders wishlist button when isWishlist is false', async () => {
    expect(wrapper.find('button.btn-primary.btn-gray').exists()).toBe(true);

    await wrapper.setProps({ isWishlist: true });
    expect(wrapper.find('button.btn-primary.btn-gray').exists()).toBe(false);
  });
});
