import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    function geocoder(options?: any): Control & Evented;
  }
}
