//@ts-ignore
import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const Wrapper = styled.div.attrs({
  className: 'absolute top-3 px-3 grid grid-flow-col gap-3'
})`
  grid-auto-columns: max-content;
`;

export const LocationImg = styled.img`
  height: 20px !important;
  margin-right: 5px;
`;

export const StyledMapContainer = styled(MapContainer).attrs({
  className: 'w-full cursor-grab z-0 rounded-3xl'
})`
  height: 109px;

  & .leaflet-control-zoom {
    display: none !important;
  }
`;
