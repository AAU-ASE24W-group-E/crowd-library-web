<template>

  <div class="tw-component-container" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center">
      <div>
        <h1 class="tw-subheading text-[30px] text-gray-600">Books on Map</h1>
      </div>
      <div class="flex flex-row items-center space-x-6 pr-1">
        <div class="flex flex-row items-center space-x-2">
          <!-- <span class="dark:text-title-dark-mode-text">Sort by:</span> -->
          <div class="relative">
            <button
            @click="setBoundsToExtentOfAllBook"
            class="btn-primary btn-blue rounded hover:scale-100 hover:-translate-y-0"
            >Show all books</button>
          </div>
        </div>
      </div>
    </div>
    <div id="book-map"></div>
</div>
</template>

<script>
import { ref } from 'vue'
import { onMounted } from 'vue'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import '@stadiamaps/maplibre-search-box/dist/style.css'
import { featureCollection, point } from '@turf/helpers'
import { getPopupHTML } from '@/utils/bookPopup'

const default_zoom = 13
const max_search_results = 5
const map_search_position = 'top-left'
const min_zoom_for_books = 6
const map_style = {
  version: 8,
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.de/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: 'OpenStreetMap',
    },
  },
  layers: [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'raster-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
}

const default_book_color = '#336B81'
const all_popups = []

export default {
  props: ['books'],
  setup(props) {
    let map
    console.log(props.books)
    let books = props.books

    const calculateBoundsOfAllBooks = (geojson) => {
      let minLng = Infinity
      let minLat = Infinity
      let maxLng = -Infinity
      let maxLat = -Infinity

      geojson.features.forEach((feature) => {
        const [lng, lat] = feature.geometry.coordinates

        if (lng < minLng) minLng = lng
        if (lat < minLat) minLat = lat
        if (lng > maxLng) maxLng = lng
        if (lat > maxLat) maxLat = lat
      })

      return [
        [minLng, minLat],
        [maxLng, maxLat],
      ]
    }

    const parseBooksToFeatureCollection = (books) => {
      const features = books.map((book) => {
        const { lat, long, ...properties } = book
        return point([long, lat], properties)
      })
      return featureCollection(features)
    }

    books = parseBooksToFeatureCollection(books)

    const addLayerToMap = async (map) => {
      map.addSource('book-data', {
        type: 'geojson',
        data: books,
      })

      map.addLayer({
        id: 'book-layer',
        type: 'circle',
        source: 'book-data',
        minzoom: min_zoom_for_books,
        paint: {
          'circle-radius': 15,
          'circle-color': default_book_color,
          'circle-opacity': 0.4,
          'circle-stroke-width': 2,
          'circle-stroke-color': default_book_color,
          'circle-stroke-opacity': 1,
        },
      })
    }

    const setBoundsToExtentOfAllBook = () => {
      let bounds = calculateBoundsOfAllBooks(books)
      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 0,
      })
    }

    const openPopUp = (feature) => {
      const coordinates = feature.geometry.coordinates.slice()
      const popupHTML = getPopupHTML(feature.properties)

      let popup = new maplibregl.Popup({ offset: 5 })
        .setLngLat(coordinates)
        .setHTML(popupHTML)
        .addTo(map)
      all_popups.push(popup)
    }

    onMounted(() => {
      console.log("Mounted")
      map = new maplibregl.Map({
        container: 'book-map',
        style: map_style,
        zoom: default_zoom,
        attributionControl: false,
      })

      setBoundsToExtentOfAllBook()

      const searchBoxControl = new MapLibreSearchControl({
        maxResults: max_search_results,
        zoom: min_zoom_for_books,
        mapFocusPointMinZoom: 5,
      })

      map.addControl(searchBoxControl, map_search_position)
      map.addControl(new maplibregl.NavigationControl(), 'top-right')
      map.addControl(new maplibregl.GeolocateControl(), 'bottom-right')

      map.on('load', async () => {
        addLayerToMap(map)
      })

      map.on('click', 'book-layer', (e) => {
        openPopUp(e.features[0])
        // go to list and show item? Is this possible?
      })

      map.on('mouseenter', 'book-layer', () => {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'book-layer', () => {
        map.getCanvas().style.cursor = ''
      })

      map.on('mousedown', (e) => {
        if (e.originalEvent.button !== 1) return
      })
    })

    return {
      map,
      setBoundsToExtentOfAllBook
    }
    
  }
}
</script>

<style scoped>

  #book-map{
    @apply w-[140vh] h-[50vh] mt-5
  }
</style>
