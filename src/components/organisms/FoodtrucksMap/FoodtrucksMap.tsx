import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ShowFoodtrucks from 'components/molecules/ShowFoodtrucks/ShowFoodtrucks';
import { setLocation } from 'helpers/setLocation';
// @ts-ignore
import { Map } from '@types/leaflet';
import { FoodtruckState } from 'types/Foodtrucktypes';

type Props = {
  setPosition: (latlng: { lat: number; lng: number; alt?: number }) => void;
};

export let defaultMap: Map;

const MapEvents = ({ setPosition }: Props) => {
  const map = useMapEvents({
    click() {
      map.locate();
      const controlZoom = document.querySelector('.leaflet-bar') as HTMLDivElement;
      controlZoom.classList.add('!top-20');
    },
    locationfound(e) {
      setPosition(e.latlng);
      setLocation(e.latlng, map);
    }
  });
  defaultMap = map;
  return null;
};

type MapProps = {
  foodtrucks: FoodtruckState[];
  setCurrentFoodtruck: (currentFoodtruck: FoodtruckState) => void;
};

const FoodtrucksMap = ({ foodtrucks, setCurrentFoodtruck }: MapProps) => {
  const location = localStorage.getItem('location');
  const [position, setPosition] = useState(
    location ? JSON.parse(location) : { lat: 52.232855, lng: 20.9211124 }
  );

  return (
    <MapContainer
      className="w-full h-screen overflow-hidden cursor-grab z-0"
      center={position}
      zoom={18}
    >
      <MapEvents setPosition={setPosition} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ShowFoodtrucks foodtrucks={foodtrucks} setCurrentFoodtruck={setCurrentFoodtruck} />
    </MapContainer>
  );
};

export default FoodtrucksMap;
