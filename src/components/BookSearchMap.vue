<template>

  <div class="tw-component-container px-0 w-full" ref="dropdownRef">
    <div class="flex flex-row w-full justify-between items-center">
      <div>
        <h1 class="tw-subheading text-[30px]">Books on Map</h1>
      </div>
      <div class="flex flex-row items-center space-x-6 pr-1">
        <div class="flex flex-row items-center space-x-2">
          <div class="relative">
            <button
            @click="setBoundsToExtentOfAllBook"
            class="btn-primary btn-blue rounded hover:scale-100 hover:-translate-y-0"
            >Show all books</button>
          </div>
        </div>
      </div>
    </div>
    <div id="book-map" class="w-full h-[450px] mt-5"></div>
</div>
</template>

<script>
import { onMounted } from 'vue'
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl'
import '@stadiamaps/maplibre-search-box/dist/style.css'
import { featureCollection, point } from '@turf/helpers'
import { getPopupHTML } from '@/utils/bookPopup'
import config from "@/config.json";

const default_zoom = config.BOOK_MAP_DEFAULT_ZOOM;
const min_zoom_for_books = config.BOOK_MAP_MIN_ZOOM_FOR_BOOKS;
const map_style = config.POI_AND_BOOK_MAP_STYLE;
const availableColor = config.BOOK_MAP_AVAILABLE_COLOR;
const unavailableColor = config.BOOK_MAP_UNAVAILABLE_COLOR;
let all_popups = []

export default {
  props: ['books'],
  setup(props) {
    let map
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
          'circle-opacity': 0.4,
          'circle-stroke-width': 2,
          'circle-color': [
              'case',
              ['==', ['get', 'status'], 'Available'], availableColor,
              ['==', ['get', 'status'], 'Unavailable'], unavailableColor,
              '#CCCCCC'
            ],
          'circle-stroke-color': [
              'case',
              ['==', ['get', 'status'], 'Available'], availableColor,
              ['==', ['get', 'status'], 'Unavailable'], unavailableColor,
              '#CCCCCC'
            ],
          'circle-stroke-opacity': 1,
        },
      })
    }

    const setBoundsToExtentOfAllBook = () => {
      closeAllPopups()

      let bounds = calculateBoundsOfAllBooks(books)
      map.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
        duration: 0,
      })
    }

    const openPopUp = (feature) => {
      closeAllPopups()
      const coordinates = feature.geometry.coordinates.slice()
      const popupHTML = getPopupHTML(feature.properties)

      let popup = new maplibregl.Popup({ offset: 5 })
        .setLngLat(coordinates)
        .setHTML(popupHTML)
        .addTo(map)
      all_popups.push(popup)
    }

    onMounted(() => {
      map = new maplibregl.Map({
        container: 'book-map',
        style: map_style,
        zoom: default_zoom,
        attributionControl: false,
      })

      setBoundsToExtentOfAllBook()

      map.addControl(new maplibregl.NavigationControl(), 'top-right')
      map.addControl(new maplibregl.GeolocateControl(), 'bottom-right')

      map.on('load', async () => {
        addLayerToMap(map)
      })

      map.on('click', 'book-layer', (e) => {
        openPopUp(e.features[0])
        // go to list and show item? Is this possible? Yes, but was decided against :)
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

    const getBookFeatureByIsbn = (isbn) => {
      return books.features.find((feature) => feature.properties.ISBN === isbn)
    }

    const closeAllPopups = () => {
      if (!map) return
      all_popups.forEach((popup) => {
        popup.remove()
      })
      all_popups = []
    }

    const zoomToPoint = (book) => {
      let feature = getBookFeatureByIsbn(book.ISBN)
      if(!feature) return
      map.flyTo({
        center: [book.long - 0.0025, book.lat], 
        zoom: 17,
        speed: 4,
        curve: 1.5
      });

      openPopUp(feature)
    }

    return {
      map,
      setBoundsToExtentOfAllBook,
      zoomToPoint
    }

  }
}
</script>
