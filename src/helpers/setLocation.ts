// @ts-ignore
import { Map } from '@types/leaflet';

export const setLocation = (location: { lat: number; lng: number }, map: Map) => {
  localStorage.setItem('location', JSON.stringify(location));
  map.flyTo(location, map.getZoom());

  return null;
};
