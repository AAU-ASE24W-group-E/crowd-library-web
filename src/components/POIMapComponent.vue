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
import colors from "@/assets/color";
import map_icons from "@/assets/map_icons";

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

const overpassUrl = "https://overpass-api.de/api/interpreter";
const osm_types = ['"amenity"="public_bookcase"', '"amenity"="library"', '"shop"="books"']
let poi_types = ["library", "public_bookcase", "shop_books"]
let poi_geojson = featureCollection([])
let poi_points = {}

//auslagern
const calculateCentroid = (geometry) => {
  const latitudes = geometry.map((point) => point.lat);
  const longitudes = geometry.map((point) => point.lon);

  const centroidLat = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
  const centroidLon = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;

  return { lat: centroidLat, lon: centroidLon };
};



//auslagern
const getLonLatOfElement = (element) => {
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

const getTypeOfElement = (element) => {
  let element_tags = Object.keys(element.tags);
  let t;
  if (element_tags.includes('amenity')) {
    t =  element["tags"]["amenity"];
  } else if (element_tags.includes('shop')) {
    t = "shop_" + element["tags"]["shop"] // the osm data includes "shop": "books" the type is shop_books
  }
  if(!poi_types.includes(t)) return "default";
  else return t;
}

const OSMtoGeoJsonFeaturePoints = (elements) => {
  let features = []
  elements.forEach((element) => {
    if (Object.keys(poi_points).includes(String(element.id))) {
      return
    }

    let p = getLonLatOfElement(element)
    if (!p) return;

    element["tags"]["type"] = getTypeOfElement(element)

    let poi = point([p.lon, p.lat], { ...element.tags, id: element.id })
    features.push(poi);
    poi_points[element.id] = poi
  });
  return features
}

const getGeoJsonWithAddedPOIs = (elements) => {
  const features = [];
  Object.values(poi_points).forEach((value) => {
    features.push(value);
  })
  features.push(...OSMtoGeoJsonFeaturePoints(elements));
  return featureCollection(features);
}

//auslagern
const getOSMQuery = (bbox) => {
  let s = "[out:json][timeout:25]; (";
  osm_types.forEach(type => s += `nwr[${type}](${bbox});`);
  s += `);out geom;`;
  return s;
}

//auslagern
const fetchOverpassData = async (bbox) => {
  try {
    const response = await axios.post(overpassUrl, getOSMQuery(bbox), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    poi_geojson = getGeoJsonWithAddedPOIs(response.data.elements);
    return poi_geojson;
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return [];
  }
};

const getIconImage = () => {
  let icon_image =  ["match", ["get", "type"]]
  poi_types.forEach(type => {
    // looks weird but the icon_image of maplibre layer takes
    // "icon-image": [ "match", ["get", "type"], "library", "library", "shop_books", "shop_books", "public_bookcase", "public_bookcase", "default-icon"]
    icon_image.push(type)
    icon_image.push(type)
  });
  icon_image.push("default-icon")
  console.log(icon_image)
  return icon_image
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

const addSVGDefintions = (map) => {
  Object.keys(map_icons).forEach(icon_name => {
    const svgImage = new Image(35, 35);
    svgImage.onload = () => {
      map.addImage(icon_name, svgImage)
    }
    function svgStringToImageSrc(svgString) {
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString)
    }

    const pin = map_icons[icon_name].replaceAll('fill:#', 'fill:' + colors[icon_name]);
    svgImage.src = svgStringToImageSrc(pin);
  });
  return map
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
      await fetchOverpassData(bbox);
      map.getSource("pois").setData(poi_geojson);
    };

    updateData()
    addLayerToMap(map)
    map.on("moveend", updateData);
  });

  map.on('mousedown', (e) => {
    if (e.originalEvent.button !== 1) return;
  });
});

</script>
