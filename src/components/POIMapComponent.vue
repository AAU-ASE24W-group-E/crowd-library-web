<template>
  <div class="tw-heading mb-5">Bookish Map</div>
    <div  id="map" class="h-[90%] mb-20"></div>
</template>

<script>
import { onMounted } from 'vue'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import '@stadiamaps/maplibre-search-box/dist/style.css'
import { featureCollection } from '@turf/helpers'
import marker from '@/assets/map_icons'
import fetchOverpassData from '@/utils/osmService'
import { getPopupHTML } from '@/utils/poiPopup'
import { useMapLegendStore } from '@/stores/poiMapLegend'
import { usePoiMapFeatureStore } from '@/stores/poiMapFeatures'
import config from "@/config.json";

const default_center = config.POI_MAP_DEFAULT_CENTER;
const default_zoom = config.POI_MAP_DEFAULT_ZOOM;
const min_zoom_for_pois = config.POI_MAP_MIN_ZOOM_FOR_POIS;
const clear_pois_at_zoom = config.POI_MAP_CLEAR_ZOOM;
const max_search_results = config.POI_MAP_MAX_SEARCH_RESULTS;
const map_search_position = config.POI_MAP_SEARCH_POSITION;
const map_style = config.POI_AND_BOOK_MAP_STYLE;

let poi_geojson = featureCollection([])
let poi_geojson_filtered = featureCollection([])
let all_poi_points = {}
let all_popups = []

export default {
  props: ['poi_info'],
  setup(props) {
    let map
    let poi_info = props.poi_info
    const mapLegendStore = useMapLegendStore()
    const poiMapFeatureStore = usePoiMapFeatureStore()

    const getIconImage = () => {
      let icon_image = ['match', ['get', 'type']]
      Object.keys(poi_info).forEach((type) => {
        icon_image.push(type)
        icon_image.push(type)
      })
      icon_image.push('default-icon')
      return icon_image
    }

    const svgStringToImageSrc = (svgString) => {
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString)
    }

    const addSVGDefintions = (map) => {
      Object.keys(poi_info).forEach((type) => {
        const svgImage = new Image(35, 35)
        svgImage.onload = () => {
          map.addImage(type, svgImage)
        }
        const pin = marker.replaceAll('fill:#', 'fill:' + poi_info[type]['color'])
        svgImage.src = svgStringToImageSrc(pin)
      })
      return map
    }

    const filterFeaturesByTypes = (features, types) => {
      return features.filter((feature) => types.includes(feature.properties.type))
    }

    const filterDataSource = (active_types) => {
      if (active_types) {
        poi_geojson_filtered = featureCollection(
          filterFeaturesByTypes(poi_geojson.features, active_types),
        )
      }
      if (map) {
        poiMapFeatureStore.setPOIs(poi_geojson_filtered)
        map.getSource('pois').setData(poi_geojson_filtered)
      }
    }

    const openPopUp = (feature) => {
      const coordinates = feature.geometry.coordinates.slice()
      const popupHTML = getPopupHTML(feature.properties, poi_info)

      let popup = new maplibregl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(popupHTML)
        .addTo(map)
      all_popups.push(popup)
    }

    const resetOSMFeatures = () => {
      poi_geojson = featureCollection([])
      poi_geojson_filtered = featureCollection([])
      all_poi_points = {}
      filterDataSource()
    }

    const addLayerToMap = async (map) => {
      map.addSource('pois', {
        type: 'geojson',
        data: poi_geojson,
      })

      map.addLayer({
        id: 'poi-layer',
        type: 'symbol',
        source: 'pois',
        minzoom: min_zoom_for_pois,
        layout: {
          'icon-image': getIconImage(),
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
        },
      })
    }

    onMounted(() => {
      map = new maplibregl.Map({
        container: 'map',
        style: map_style,
        center: default_center,
        zoom: default_zoom,
        attributionControl: false,
      })


      const searchBoxControl = new MapLibreSearchControl({
        maxResults: max_search_results,
        zoom: min_zoom_for_pois,
        mapFocusPointMinZoom: 5,
        onResultSelected: (feature) => {
          const mapBounds = map.getBounds();
          const resultLngLat = new maplibregl.LngLat(feature.geometry.coordinates[0], feature.geometry.coordinates[1]);

          // if the search result is outside of the current map extent the features are reset
          if (!mapBounds.contains(resultLngLat)) {
            resetOSMFeatures();
          }
        },
      })

      map.addControl(searchBoxControl, map_search_position)
      map.addControl(new maplibregl.NavigationControl(), 'top-right')
      map.addControl(new maplibregl.GeolocateControl(), 'bottom-right')

      map = addSVGDefintions(map)

      map.on('load', async () => {
        const updateData = async () => {
          if (map.getZoom() < min_zoom_for_pois) {
            return // pois are not loaded for zoom levels smaller than min_zoom_pois
          }
          const bounds = map.getBounds()
          const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`
          ;[poi_geojson, all_poi_points] = await fetchOverpassData(bbox, poi_info, all_poi_points)

          filterDataSource(mapLegendStore.getActiveTypes(mapLegendStore.typeStates))
        }

        updateData()
        addLayerToMap(map)
        map.on('moveend', updateData)
      })

      map.on('click', 'poi-layer', (e) => {
        openPopUp(e.features[0])
      })

      map.on('mouseenter', 'poi-layer', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'poi-layer', () => {
        map.getCanvas().style.cursor = ''
      })

      map.on('mousedown', (e) => {
        if (e.originalEvent.button !== 1) return
      })

      map.on('zoom', () => {
        const currentZoom = map.getZoom() // Get the current zoom level
        if (currentZoom <= clear_pois_at_zoom) {
          resetOSMFeatures()
        }
      })
    })

    const zoomToClickedItem = (feature) => {
      map.flyTo({
        center: feature.geometry.coordinates,
        zoom: 17,
        speed: 3,
        curve: 1.5,
        easing: function (t) {
          return t
        },
      })
    }

    const closeAllPopups = () => {
      if (!map) return
      all_popups.forEach((popup) => {
        popup.remove()
      })
      all_popups = []
    }

    return {
      filterDataSource,
      mapLegendStore,
      zoomToClickedItem,
      closeAllPopups,
      map,
    }
  },
  watch: {
    'mapLegendStore.typeStates': {
      handler(newTypes) {
        let activeTypes = this.mapLegendStore.getActiveTypes(newTypes)
        this.closeAllPopups()
        this.filterDataSource(activeTypes)
      },
      deep: true,
    },
  },
}
</script>
