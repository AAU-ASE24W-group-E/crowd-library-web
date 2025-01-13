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

  // Check that all necessary info is rendered
  it('renders the request details correctly', () => {
    expect(wrapper.text()).toContain('Request for Lending (by User3)');
    expect(wrapper.text()).toContain('Publisher: Ocean Breeze Press');
    expect(wrapper.text()).toContain('Format: Hardcover');
    expect(wrapper.text()).toContain('Language: EN');
    expect(wrapper.text()).toContain('ISBN: 2233445566');
    expect(wrapper.text()).toContain('Date: -');
    expect(wrapper.text()).toContain('Place: -');
  });
});
