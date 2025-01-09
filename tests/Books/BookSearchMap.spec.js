import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BookSearchMap from '@/components/BookSearchMap.vue';
import { flushPromises } from '@vue/test-utils';

vi.mock('maplibre-gl', () => {
  const Map = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    off: vi.fn(),
    fitBounds: vi.fn(),
    addControl: vi.fn(),
    addImage: vi.fn(),
    addSource: vi.fn(),
    addLayer: vi.fn(),
    flyTo: vi.fn(),
    getBounds: vi.fn(() => ({
      getNorth: () => 46.7,
      getSouth: () => 46.5,
      getEast: () => 14.3,
      getWest: () => 14.2,
    })),
    getZoom: vi.fn(() => 12),
    getSource: vi.fn(() => ({
      setData: vi.fn(),
    })),
    remove: vi.fn(),
    getCanvas: vi.fn(() => ({
      style: { cursor: '' },
    })),
  }));

  const Popup = vi.fn(() => ({
    setLngLat: vi.fn().mockReturnThis(),
    setHTML: vi.fn().mockReturnThis(),
    addTo: vi.fn(),
    remove: vi.fn(),
  }));

  const NavigationControl = vi.fn();
  const GeolocateControl = vi.fn();

  return {
    default: { Map, Popup, NavigationControl, GeolocateControl },
  };
});
import maplibregl from 'maplibre-gl';

const push = vi.fn();
    vi.mock('vue-router', () => ({
      useRouter: () => ({
        push,
      }),
    }));

describe('BookSearchMap', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BookSearchMap, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
      props: {
        books: [
          {
            title: 'Book1',
            year: '2020',
            author: 'Author1',
            publisher: 'Publisher1',
            format: 'Paperback',
            language: 'EN',
            ISBN: '1234567890',
            owner: 'Owner1',
            isAvailable: true,
            isLendable: true,
            isExchangeable: false,
            isGiftable: true,
            status: 'Available',
            lat: 46.622305,
            long: 14.272915,
          },
          {
            title: 'Book2',
            year: '2021',
            author: 'Author2',
            publisher: 'Publisher2',
            format: 'Hardcover',
            language: 'FR',
            ISBN: '0987654321',
            owner: 'Owner2',
            isAvailable: false,
            isLendable: false,
            isExchangeable: true,
            isGiftable: false,
            status: 'Unavailable',
            lat: 46.619025,
            long: 14.265755,
          },
        ],
      },
    });
    

  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('.tw-subheading').text()).toBe('Books on Map');
    expect(wrapper.find('#book-map').exists()).toBe(true);
    expect(wrapper.find('.btn-primary').exists()).toBe(true);
    expect(wrapper.find('.btn-primary').text()).toBe('Show all books');
  });
});
