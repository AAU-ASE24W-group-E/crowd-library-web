<template>
  <div class="tw-heading mb-5 mt-2">Bookish Map</div>
  <div id="map"></div>
</template>

<script setup>


import { onMounted } from 'vue';
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl from 'maplibre-gl';
import { MapLibreSearchControl } from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";
import { featureCollection } from "@turf/helpers";
import colors from "@/assets/color";
import map_icons from "@/assets/map_icons";
import fetchOverpassData from "@/utils/osmService"
import { getPopupHTML } from "@/utils/poiPopup"

const default_center = [14.26492, 46.616308]
const default_zoom = 13
const min_zoom_for_pois = 11
const max_search_results = 5
const map_search_position = "top-left"
const map_style = {
  'version': 8,
  'sources': {
    'raster-tiles': {
      'type': 'raster',
      'tiles': [
        'https://tile.openstreetmap.de/{z}/{x}/{y}.png'
      ],
      'tileSize': 256,
      'attribution': 'OpenStreetMap'
    }
  },
  'layers': [
    {
      'id': 'simple-tiles',
      'type': 'raster',
      'source': 'raster-tiles',
      'minzoom': 0,
      'maxzoom': 22
    }
  ]
}



let poi_info = {
  "library": {
    "osm_type": '"amenity"="public_bookcase"',
    "display_type": "Library"
  },
  "public_bookcase": {
    "osm_type": '"amenity"="library"',
    "display_type": "Tiny Library"
  },
  "shop_books": {
    "osm_type": '"shop"="books"',
    "display_type": "Book Shop"
  }
}
let poi_geojson = featureCollection([])
let poi_points = {}


const getIconImage = () => {
  let icon_image = ["match", ["get", "type"]]
  Object.keys(poi_info).forEach(type => {
    // looks weird but the icon_image of maplibre layer takes
    // "icon-image": [ "match", ["get", "type"], "library", "library", "shop_books", "shop_books", "public_bookcase", "public_bookcase", "default-icon"]
    icon_image.push(type)
    icon_image.push(type)
  });
  icon_image.push("default-icon")
  console.log(icon_image)
  return icon_image
}

const svgStringToImageSrc = (svgString) => {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString)
}

const addSVGDefintions = (map) => {
  Object.keys(map_icons).forEach(icon_name => {
    const svgImage = new Image(35, 35);
    svgImage.onload = () => {
      map.addImage(icon_name, svgImage)
    }
    const pin = map_icons[icon_name].replaceAll('fill:#', 'fill:' + colors[icon_name]);
    svgImage.src = svgStringToImageSrc(pin);
  });
  return map
}

const addLayerToMap = async (map) => {
  map.addSource("pois", {
    type: "geojson",
    data: poi_geojson,
  });

  map.addLayer({
    id: "poi-layer",
    type: "symbol",
    source: "pois",
    minzoom: min_zoom_for_pois,
    layout: {
      "icon-image": getIconImage(),
      "icon-anchor": "bottom",
      "icon-allow-overlap": true
    }
  });
}

onMounted(() => {
  let map = new maplibregl.Map({
    container: 'map',
    style: map_style,
    center: default_center,
    zoom: default_zoom,
    attributionControl: false
  });

  const control = new MapLibreSearchControl({
    maxResults: max_search_results,
    zoom: min_zoom_for_pois + 1
  });
  map.addControl(control, map_search_position);
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  map.addControl(new maplibregl.GeolocateControl(), 'bottom-right');

  map = addSVGDefintions(map)

  map.on("load", async () => {
    const updateData = async () => {
      if (map.getZoom() < min_zoom_for_pois) {
        return // pois are not loaded for zoom levels smaller than min_zoom_pois
      }
      const bounds = map.getBounds();
      const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
      [poi_geojson, poi_points] = await fetchOverpassData(bbox, poi_info, poi_points);
      map.getSource("pois").setData(poi_geojson);
    };

    updateData()
    addLayerToMap(map)
    map.on("moveend", updateData);
  });

  map.on("click", "poi-layer", (e) => {
    if(e.features != null && e.features.length > 0) return
    const coordinates = e.features[0].geometry.coordinates.slice();

    new maplibregl.Popup({ offset: 25 })
      .setLngLat(coordinates)
      .setHTML(getPopupHTML(e.features[0].properties, poi_info))
      .addTo(map);
  });

  map.on("mouseenter", "poi-layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "poi-layer", () => {
    map.getCanvas().style.cursor = "";
  });

  map.on('mousedown', (e) => {
    if (e.originalEvent.button !== 1) return;
  });
});

</script>
