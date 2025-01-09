import axios from 'axios'
const overpassUrl = 'https://overpass-api.de/api/interpreter'
import { featureCollection, point } from "@turf/helpers";


export const getOSMQuery = (bbox:string, poi_info:any) => {
  let s = '[out:json][timeout:25]; ('
  Object.values(poi_info).forEach((type: any) => (s += `nwr[${type['osm_type']}](${bbox});`))
  s += `);out geom;`
  return s
}

export const getTypeOfElement = (element: any, poi_info: any) => {
  let element_tags = Object.keys(element.tags)
  let t
  if (element_tags.includes('amenity')) {
    t = element['tags']['amenity']
  } else if (element_tags.includes('shop')) {
    t = 'shop_' + element['tags']['shop'] // the osm data includes "shop": "books" the type is shop_books
  }
  if (!Object.keys(poi_info).includes(t)) return 'default'
  else return t
}

export const calculateCentroid = (geometry:any) => {
  const latitudes = geometry.map((point: any) => point.lat)
  const longitudes = geometry.map((point: any) => point.lon)

  const centroidLat = latitudes.reduce((sum: any, lat: any) => sum + lat, 0) / latitudes.length
  const centroidLon = longitudes.reduce((sum: any, lon: any) => sum + lon, 0) / longitudes.length

  return { lat: centroidLat, lon: centroidLon }
}

export const getLonLatOfElement = (element:any) => {
  let p
  if (element.type === 'node' && element.lat && element.lon) {
    p = element
  } else if (element.type === 'way' && element.geometry) {
    p = calculateCentroid(element.geometry)
  } else return false
  if (isNaN(p.lat) || isNaN(p.lon)) return false
  return p
}

export const OSMtoGeoJsonFeaturePoints = (elements: any, poi_info:any, poi_points: any) => {
  let all_features:any = []
  elements.forEach((element:any) => {
    if (Object.keys(poi_points).includes(String(element.id))) {
      return
    }

    let p = getLonLatOfElement(element)
    if (!p) return

    element['tags']['type'] = getTypeOfElement(element, poi_info)

    let poi = point([p.lon, p.lat], { ...element.tags, id: element.id })
    all_features.push(poi)
    poi_points[element.id] = poi
  })
  return [all_features, poi_points]
}

export const getGeoJsonWithAddedPOIs = (elements: any, poi_info: any, poi_points: any) => {
  const features = []
  Object.values(poi_points).forEach((value) => {
    features.push(value)
  })
  let [new_feature_points, points] = OSMtoGeoJsonFeaturePoints(elements, poi_info, poi_points)
  features.push(...new_feature_points)
  return [featureCollection(features), points]
}

 const fetchOverpassData = async (bbox: string, poi_info: any, poi_points: any) => {
  try {
    const response = await axios.post(overpassUrl, getOSMQuery(bbox, poi_info), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return getGeoJsonWithAddedPOIs(response.data.elements, poi_info, poi_points)
  } catch (error) {
    console.error('Error fetching data from Overpass API:', error)
    return []
  }
}

export default fetchOverpassData;