import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import POIMapComponent from '@/components/POIMapComponent.vue';
import { useMapLegendStore } from '@/stores/poiMapLegend';
import { usePoiMapFeatureStore } from '@/stores/poiMapFeatures';

// Mocking the maplibregl library
vi.mock("maplibre-gl", () => {
  const Map = vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    off: vi.fn(),
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
      style: { cursor: "" },
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

// Mocking the store
vi.mock('@/stores/poiMapLegend', () => ({
  useMapLegendStore: vi.fn(() => ({
    getActiveTypes: vi.fn().mockReturnValue([]),
    typeStates: {},
  })),
}));

vi.mock('@/stores/poiMapFeatures', () => ({
  usePoiMapFeatureStore: vi.fn(() => ({
    setPOIs: vi.fn(),
  })),
}));

describe('POIMapComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(POIMapComponent, {
      global: {
        stubs: ['router-link'],  // Assuming you're using router-links or other child components
      },
      props: {
        poi_info: {
            library: {
                osm_type: '"amenity"="public_bookcase"',
                display_type: 'Library',
                color: '#55ad07',
              },
            public_bookcase: {
                osm_type: '"amenity"="library"',
                display_type: 'Tiny Library',
                color: '#1881c9',
            },
            shop_books: {
                osm_type: '"shop"="books"',
                display_type: 'Book Shop',
                color: "#cc0000",
            }
        },
      },
    });
    wrapper.vm.$nextTick();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('.tw-heading').text()).toBe('Bookish Map');
    expect(wrapper.find('#map').exists()).toBe(true);
  });

  // it("renders the map and initializes maplibre", async () => {
  //   await wrapper.vm.$nextTick();  
  //   const mapInstance = maplibregl.Map.mock.instances[0];

  //   const addControlSpy = vi.spyOn(mapInstance, 'addControl');
  //   const onSpy = vi.spyOn(mapInstance, 'on');
  //   const getCanvasSpy = vi.spyOn(mapInstance, 'getCanvas');

  //   console.log('addControlSpy:', addControlSpy);
  //   console.log('onSpy:', onSpy);
  //   console.log('getCanvasSpy:', getCanvasSpy);

  //   expect(addControlSpy).toHaveBeenCalledTimes(3); 
  //   expect(onSpy).toHaveBeenCalledWith('load', expect.any(Function));
  //   expect(getCanvasSpy).toHaveBeenCalledTimes(1);

  //   expect(mapInstance.addControl).toHaveBeenCalledTimes(3);
  // });
});