import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import fetchOverpassData, {
  getOSMQuery,
  getTypeOfElement,
  calculateCentroid,
  getLonLatOfElement,
  OSMtoGeoJsonFeaturePoints,
  getGeoJsonWithAddedPOIs,
} from '@/utils/osmService'

vi.mock('axios')

describe('osmService', () => {
  let mockPoiInfo
  let mockPoiPoints
  let mockOSMElements

  beforeEach(() => {
    mockPoiInfo = {
      library: {
        osm_type: '"amenity"="public_bookcase"',
        display_type: 'Library',
        color: '#55ad07',
      },
      shop_books: {
        osm_type: '"shop"="books"',
        display_type: 'Book Shop',
        color: '#cc0000',
      },
    }

    mockPoiPoints = {}

    mockOSMElements = [
      {
        type: 'node',
        id: 486581343,
        lat: 46.6241777,
        lon: 14.3058741,
        tags: {
          shop: 'books',
        },
      },
    ]
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('getOSMQuery should generate the correct Overpass query', () => {
    const bbox = '12.34,56.78,98.76,54.32'
    const query = getOSMQuery(bbox, mockPoiInfo)
    expect(query).toBe(
      '[out:json][timeout:25]; (nwr["amenity"="public_bookcase"](12.34,56.78,98.76,54.32);nwr["shop"="books"](12.34,56.78,98.76,54.32););out geom;',
    )
  })

  it('getTypeOfElement should correctly identify the type of an OSM element', () => {
    const element = {
      tags: { amenity: 'library' },
    }
    const type = getTypeOfElement(element, mockPoiInfo)
    expect(type).toBe('library')
  })

  it('getTypeOfElement should return default type if element type is not in poi_info', () => {
    const element = {
      tags: { amenity: 'restaurant' },
    }
    const type = getTypeOfElement(element, mockPoiInfo)
    expect(type).toBe('default')
  })

  it('getTypeOfElement should return shop_* type if element tags include shop = "*"', () => {
    const element = {
      tags: { shop: 'books' },
    }
    const type = getTypeOfElement(element, mockPoiInfo)
    expect(type).toBe('shop_books')
  })

  it('calculateCentroid should calculate the centroid correctly', () => {
    const geometry = [
      { lat: 46.7, lon: 14.3 },
      { lat: 46.5, lon: 14.2 },
    ]
    const centroid = calculateCentroid(geometry)
    expect(centroid.lat).toBeCloseTo(46.6)
    expect(centroid.lon).toBeCloseTo(14.25)
  })

  it('getLonLatOfElement should correctly return the lon and lat of a node element', () => {
    const element = { type: 'node', lat: 46.7, lon: 14.3 }
    const lonLat = getLonLatOfElement(element)
    expect(lonLat).toEqual(element)
  })

  it('getLonLatOfElement should correctly return the lon and lat of a way element', () => {
    const element = {
      type: 'way',
      geometry: [
        { lat: 46.7, lon: 14.3 },
        { lat: 46.5, lon: 14.2 },
      ],
    }
    const lonLat = getLonLatOfElement(element)
    expect(lonLat.lat).toBeCloseTo(46.6)
    expect(lonLat.lon).toBeCloseTo(14.25)
  })

  it('getLonLatOfElement should return false for invalid element', () => {
    const element = { type: 'polygon' }
    const lonLat = getLonLatOfElement(element)
    expect(lonLat).toBe(false)
  })

  it('OSMtoGeoJsonFeaturePoints should transform OSM elements to GeoJSON feature points', () => {
    const [features, points] = OSMtoGeoJsonFeaturePoints(
      mockOSMElements,
      mockPoiInfo,
      mockPoiPoints,
    )
    expect(features.length).toBe(1)
    expect(points[mockOSMElements[0].id]).toBeDefined()
  })

  it('getGeoJsonWithAddedPOIs should add new POIs to GeoJSON correctly', () => {
    const [geoJson, points] = getGeoJsonWithAddedPOIs(mockOSMElements, mockPoiInfo, mockPoiPoints)
    expect(geoJson.features.length).toBe(1)
    expect(points[mockOSMElements[0].id]).toBeDefined()
  })


it('should fetch data and return GeoJSON with added POIs', async () => {
  const bbox = '12.34,56.78,98.76,54.32'

  const mockResponse = {
    data: {
      elements: mockOSMElements,
    },
  }

  axios.post.mockResolvedValue(mockResponse)
  const result = await fetchOverpassData(bbox, mockPoiInfo, mockPoiPoints)
  expect(axios.post).toHaveBeenCalledWith(
    'https://overpass-api.de/api/interpreter',
    '[out:json][timeout:25]; (nwr[\"amenity\"=\"public_bookcase\"](12.34,56.78,98.76,54.32);nwr[\"shop\"=\"books\"](12.34,56.78,98.76,54.32););out geom;',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  )
  expect(result[0].features.length).toBe(1)
  expect(result[1]).toBeDefined()
})

it('should handle error in fetchOverpassData', async () => {
  const bbox = '12.34,56.78,98.76,54.32'

  axios.post.mockRejectedValue(new Error('Error fetching data'))

  const result = await fetchOverpassData(bbox, mockPoiInfo, mockPoiPoints)
  expect(result).toEqual([])
})
});