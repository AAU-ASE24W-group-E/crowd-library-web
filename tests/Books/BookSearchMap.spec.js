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
