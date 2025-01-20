import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import BookSearchList from '@/components/BookSearchList.vue';
import Snackbar from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { bookService } from '@/services/BookService';
import { useUserStore } from '@/stores/user';
import { createRouter, createWebHistory } from 'vue-router';
import BookSearch from '@/components/BookSearch.vue';
import maplibregl from 'maplibre-gl';

vi.mock('maplibre-gl', () => {
    const Map = vi.fn().mockImplementation(() => ({
      on: vi.fn(),
      off: vi.fn(),
      addControl: vi.fn(),
      addImage: vi.fn(),
      addSource: vi.fn(),
      addLayer: vi.fn(),
      fitBounds: vi.fn(),
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

  
vi.mock('@/services/BookService', () => ({
  bookService: {
    getAvailableBooks: vi.fn(() => Promise.resolve({
      status: 200,
      data: { results: [] },
    })),
  },
}));

vi.mock('@/utils/snackbar.ts', () => ({
  showSnackbar: vi.fn(),
}));

vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    user: {
      id: 'user',
      address: { latitude: 46.617415, longitude: 14.263625 },
    },
  })),
}));

const mockBooks = [
  {
    book: { id: '1', title: 'The Forgotten Forest' },
    lendable: true,
    giftable: true,
  },
];

describe('BookSearch', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [],
    });

    wrapper = mount(BookSearch, {
      global: {
        plugins: [router],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it('renders map and book list buttons', () => {
    const mapButton = wrapper.find('.map-search-btn ');
    const listButton = wrapper.find('.list-search-btn ');

    expect(mapButton.text()).toBe('Map');
    expect(listButton.text()).toBe('Book List');
  });

});
