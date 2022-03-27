import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MapWrapper, StyledInput, SuggestItemsWrapper, Wrapper } from './Localization.styles';
import TextButton from 'components/atoms/TextButton/TextButton';
import { BtnTypes } from 'types/BtnTypes';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { FoodtruckState } from 'types/Foodtrucktypes';
import locationSVG from 'assets/icons/Icon-metro-location.svg';
import L, { Map } from 'leaflet';
import dotMaker from 'assets/icons/dotIcon.svg';
import { useFoodtrucks } from 'hooks/useFoodtrucks';
import axios from 'axios';
import { IAddress, ISearchResult } from 'nominatim-js';
import { useCombobox } from 'downshift';

type SuggestItemProps = {
  id: string;
  address: IAddress;
  coordinates: { lat: number; lng: number };
  displayName: string;
};

const markerIcon = L.icon({
  iconUrl: dotMaker,
  iconSize: [16, 16]
});

type Props = {
  setPosition: (latlng: { lat: number; lng: number; alt?: number }) => void;
};

let refMap: Map;

const MapEvents = ({ setPosition }: Props) => {
  const map = useMapEvents({
    click() {
      map.locate();
      const controlZoom = document.querySelector('.leaflet-bar') as HTMLDivElement;
      controlZoom.classList.add('!top-20');
    },
    locationfound(e) {
      setPosition(e.latlng);
    }
  });
  refMap = map;
  return null;
};

const Localization = ({ foodtruck }: { foodtruck: FoodtruckState }) => {
  const [searchValue, setSearchValue] = useState('');
  const [draggable, setDraggable] = useState(false);
  const { getFoodtruckAddress } = useFoodtrucks();
  const [newFoodtruck, setNewFoodtruck] = useState(foodtruck);
  const [suggestItems, setSuggestItems] = useState<Array<SuggestItemProps>>([]);
  const [position, setPosition] = useState({
    lat: foodtruck.location.coordinates.latitude,
    lng: foodtruck.location.coordinates.longitude
  });
  // @ts-ignore
  const markerRef = useRef<Marker>(null);

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          const foodtruck1 = {
            ...newFoodtruck,
            location: {
              coordinates: { latitude: position.lat, longitude: position.lng },
              address: newFoodtruck.location.address
            }
          };
          const newAddress = await getFoodtruckAddress(foodtruck1);
          foodtruck1.location.address = {
            country: newAddress.country,
            city: newAddress.city ? newAddress.city : newAddress.county,
            district: newAddress.state,
            street: newAddress.road,
            houseNumber: newAddress.house_number,
            zipcode: newAddress.postalCode
          };
          setNewFoodtruck(foodtruck1);
        }
      }
    }),
    [newFoodtruck]
  );

  const handleChangeSearchInput = async ({ inputValue }: { inputValue?: string }) => {
    setSearchValue(inputValue as string);
    const params = {
      q: searchValue,
      format: 'jsonv2',
      polygon_geojson: '0',
      addressdetails: '1'
    };
    const queryString = new URLSearchParams(params).toString();
    const data = await axios
      .get(`https://nominatim.openstreetmap.org/search?${queryString}`)
      .catch((err) => console.log(err));
    const newSuggestItems = data?.data.map((item: ISearchResult) => ({
      id: item.place_id,
      address: item.address,
      // @ts-ignore
      coordinates: { lat: parseFloat(item.lat), lng: parseFloat(item.lon) },
      displayName: item.display_name
    }));
    if (newSuggestItems) setSuggestItems(newSuggestItems);
    else setSuggestItems([]);
  };

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } =
    useCombobox({
      items: suggestItems || [],
      onInputValueChange: handleChangeSearchInput,
      stateReducer(state, { type, changes }) {
        if (
          type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
          type === useCombobox.stateChangeTypes.ItemClick
        ) {
          const suggestItem: SuggestItemProps | null | undefined = changes.selectedItem;
          if (suggestItem) {
            changes.inputValue = `${suggestItem.displayName}`;
            console.log(suggestItem.coordinates);
            refMap.flyTo(suggestItem.coordinates);
          }
        }
        return changes;
      }
    });

  return (
    <Wrapper {...getComboboxProps()}>
      <p className="text-lg font-medium">Aktualna lokalizacja</p>
      <MapWrapper>
        <div className="flex flex-wrap gap-2 items-center text-base">
          <img className="w-4" src={locationSVG} alt="" />
          <p>
            {newFoodtruck.location.address.city}, {newFoodtruck.location.address.street}{' '}
            {newFoodtruck.location.address.houseNumber}
          </p>
        </div>
        <MapContainer
          className="w-full overflow-hidden cursor-grab z-0 rounded-3xl h-full"
          style={{ maxHeight: '425px' }}
          center={{
            lat: newFoodtruck.location.coordinates.latitude,
            lng: newFoodtruck.location.coordinates.longitude
          }}
          zoom={18}
        >
          <MapEvents setPosition={setPosition} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            icon={markerIcon}
            ref={markerRef}
          >
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
              </span>
            </Popup>
          </Marker>
        </MapContainer>
      </MapWrapper>
      <StyledInput
        id="choose-location"
        type="text"
        name="choose-location"
        placeholder="Wybierz nową lokalizację"
        {...getInputProps()}
      />
      <SuggestItemsWrapper isVisible={isOpen && suggestItems.length > 0} {...getMenuProps()}>
        {isOpen && suggestItems.length > 0
          ? suggestItems.map((item, index) => (
              <p
                className={`flex gap-2 w-full items-center ${
                  highlightedIndex === index ? 'bg-darkBlack' : ''
                }`}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <img className="w-4" src={locationSVG} alt="" />
                {item.displayName}
              </p>
            ))
          : ''}
      </SuggestItemsWrapper>
      <TextButton
        type={BtnTypes.SUBMIT}
        isRouterLink
        classNames="text-white bg-gold font-medium w-full"
        to="/app/my-foodtrucks"
      >
        Zapisz
      </TextButton>
    </Wrapper>
  );
};

export default Localization;
