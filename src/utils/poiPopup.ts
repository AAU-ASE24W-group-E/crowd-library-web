const popUpGetName = (poi_properties: any) => {
  if (Object.keys(poi_properties).includes('name:en')) {
    poi_properties['show_name'] = poi_properties['name:en']
  } else if (Object.keys(poi_properties).includes('name')) {
    poi_properties['show_name'] = poi_properties['name']
  } else {
    poi_properties['show_name'] = ''
  }
  return poi_properties
}

const popUpGetType = (poi_properties: any, poi_info: any) => {
  if (Object.keys(poi_properties).includes('type')) {
    poi_properties['type'] = poi_info[poi_properties['type']]['display_type']
  }
  return poi_properties
}

export const getPopupHTML = (poi_properties: any, poi_info: any) => {
  poi_properties = popUpGetName(poi_properties)
  poi_properties = popUpGetType(poi_properties, poi_info)

  return `
        <div style="text-align: center;">
          <h3><b>${poi_properties.type}</b></h3>
          <p>${poi_properties['show_name']}</p>
          <p>
           ${poi_properties.website ?
            `<a href="${poi_properties.website}"
                target="_blank"
                rel="noopener noreferrer"
                style="color: blue; text-decoration: underline;"
                >Visit Website</a>` : ''}
          </p>
        </div>`
}
