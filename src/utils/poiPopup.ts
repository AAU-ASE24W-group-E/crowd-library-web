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
    if (Object.keys(poi_info).includes(poi_properties['type'])){
      poi_properties['type'] = poi_info[poi_properties['type']]['display_type']
    }
    else {
      poi_properties['type'] = "Other"
    }
  }
  return poi_properties
}

const popUpGetWebsite = (poi_properties: any) => {
  if (!Object.keys(poi_properties).includes('website') && Object.keys(poi_properties).includes('contact:website')) {
    poi_properties['website'] = poi_properties['contact:website']
  }
  return poi_properties
}

const popUpGetColor = (poi_properties: any, poi_info:any) => {
  if (!Object.keys(poi_properties).includes('type') || !Object.keys(poi_info).includes(poi_properties['type'])) {
    poi_properties["color"] = '#000000';
  }
  else poi_properties["color"] = poi_info[poi_properties['type']]["color"];
  return poi_properties;
}

export const getPopupHTML = (poi_properties: any, poi_info: any) => {
  poi_properties = popUpGetColor(poi_properties, poi_info)
  poi_properties = popUpGetName(poi_properties)
  poi_properties = popUpGetType(poi_properties, poi_info)
  poi_properties = popUpGetWebsite(poi_properties)

  return `
  <div class="text-center  font-sans p-2 rounded-lg bg-white">
    <h3 class="text-lg font-bold text-gray-800" style="color:${poi_properties.color};">${poi_properties.type}</h3>
    <p class="text-sm mb-2 text-gray-600">${poi_properties['show_name']}</p>
    ${
      poi_properties.website 
        ? `<p >
             <a href="${poi_properties.website}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="text-blue-500 underline hover:text-blue-700"
             >
               Visit Website
             </a>
           </p>` 
        : ''
    }
  </div>`;

}
