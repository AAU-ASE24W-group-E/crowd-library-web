import { describe, it, expect } from 'vitest'
import { getPopupHTML } from '@/utils/poiPopup' // Adjust the path to the file

describe('getPopupHTML', () => {
  const poi_info = {
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
      color: '#cc0000',
    },
  }

  it('getPopupHTML should generate popup HTML with all properties', () => {
    const poi_properties = {
      type: 'library',
      name: 'Library 1',
      website: 'https://library.com',
    }

    const html = getPopupHTML(poi_properties, poi_info)

    expect(html).toContain(poi_properties.type)
    expect(html).toContain(poi_properties.name)
    expect(html).toContain(poi_properties.website)
  })

  it('getPopupHTML should use "name:en" if available', () => {
    const poi_properties = {
      type: 'shop_books',
      'name:en': 'English Bookstore',
      name: 'Englischer Bücherladen',
    }

    const html = getPopupHTML(poi_properties, poi_info)

    expect(html).toContain(poi_properties.type)
    expect(html).toContain(poi_properties["name:en"])
    expect(html).not.toContain(poi_properties.name)
  })

/*  it('getPopupHTML should set "show_name" as empty if no name is provided', () => {
    const poi_properties = {
      type: 'library',
    }

    const html = getPopupHTML(poi_properties, poi_info)

    expect(html).toContain(poi_properties.type)
    expect(html).toContain('<p></p>')
  })*/

  it('getPopupHTML should use "contact:website" if "website" is not available', () => {
    const poi_properties = {
      type: 'library',
      name: 'Library 1',
      'contact:website': 'https://library.com',
    }

    const html = getPopupHTML(poi_properties, poi_info)

    expect(html).toContain(poi_properties["contact:website"],
    )
  })

  it('getPopupHTML should not include website link if no website information is available', () => {
    const poi_properties = {
      type: 'library',
      name: 'Library 1',
    }

    const html = getPopupHTML(poi_properties, poi_info)

    expect(html).not.toContain('<a')
  })

/*  it('should handle unknown "type" gracefully', () => {
    const poi_properties = {
      type: 'unknown_type',
      name: 'Unknown Type Place',
    }

    const html = getPopupHTML(poi_properties, poi_info)

    expect(html).toContain('Other')
    expect(html).toContain(poi_properties.name)
  })*/
})
