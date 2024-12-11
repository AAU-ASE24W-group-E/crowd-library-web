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
import axios from "axios";
import { featureCollection, point } from "@turf/helpers";

const default_center = [14.26492, 46.616308]
const default_zoom = 9
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

const overpassUrl = "https://overpass-api.de/api/interpreter";
const osm_types = ['"amenity"="public_bookcase"', '"amenity"="library"', '"shop"="books"']
let poi_geojson = featureCollection([])
let poi_points = {}

const calculateCentroid = (geometry) => {
  const latitudes = geometry.map((point) => point.lat);
  const longitudes = geometry.map((point) => point.lon);

  const centroidLat = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
  const centroidLon = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;

  return { lat: centroidLat, lon: centroidLon };
};

const get_lon_lat_of_element = (element) => {
  let p;
  if (element.type === "node" && element.lat && element.lon) {
    p = element;
  }
  else if (element.type === "way" && element.geometry) {
    p = calculateCentroid(element.geometry);
  }
  else return false;
  if (isNaN(p.lat) || isNaN(p.lon)) return false;
  return p;
}

const osm_to_geojson_feature_points = (elements) => {
  let features = []
  elements.forEach((element) => {
    if (Object.keys(poi_points).includes(String(element.id))) {
      return
    }

    let p = get_lon_lat_of_element(element)
    if (!p) return;

    let poi = point([p.lon, p.lat], { ...element.tags, id: element.id })
    features.push(poi);
    poi_points[element.id] = poi
  });
  return features
}

const get_geojson_with_added_pois = (elements) => {
  const features = [];
  Object.values(poi_points).forEach((value) => {
    features.push(value);
  })
  features.push(...osm_to_geojson_feature_points(elements));
  return featureCollection(features);
}

const get_osm_query = (bbox) => {
  let s = "[out:json][timeout:25]; (";
  osm_types.forEach(type => s += `nwr[${type}](${bbox});`);
  s += `);out geom;`;
  return s;
}

const fetchOverpassData = async (bbox) => {
  try {
    const response = await axios.post(overpassUrl, get_osm_query(bbox), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    poi_geojson = get_geojson_with_added_pois(response.data.elements);
    return poi_geojson;
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return [];
  }
};

const add_layer_to_map = (map) => {
  map.addSource("pois", {
    type: "geojson",
    data: poi_geojson,
  });

  map.addLayer({
    id: "poi-layer",
    type: "circle",
    source: "pois",
    minzoom: min_zoom_for_pois
  });
}

onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map',
    style: map_style,
    center: default_center,
    zoom: default_zoom,
    attributionControl: false
  });

  const control = new MapLibreSearchControl({
    maxResults: max_search_results,
  });
  map.addControl(control, map_search_position);

  map.on("load", async () => {
    const updateData = async () => {
      if (map.getZoom() < min_zoom_for_pois) {
        return // pois are not loaded for zoom levels smaller than min_zoom_pois
      }
      const bounds = map.getBounds();
      const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
      await fetchOverpassData(bbox);
      map.getSource("pois").setData(poi_geojson);
    };

    updateData()
    add_layer_to_map(map)
    map.on("moveend", updateData);
  });

  map.on('mousedown', (e) => {
    if (e.originalEvent.button !== 1) return;
  });
});

</script>
