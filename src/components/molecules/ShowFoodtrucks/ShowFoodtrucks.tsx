// @ts-ignore
import { BBox } from 'supercluster';
import React, { useCallback, useEffect, useState } from 'react';
import useSupercluster from 'use-supercluster';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import dotMaker from 'assets/img/dotIcon.svg';
import foodtrucks_icon from 'assets/img/foodtrucks-icon.svg';
import { FoodtruckState } from 'types/Foodtrucktypes';

const icons = {};
const fetchIcon = (count: number | string, size: number) => {
  // @ts-ignore
  if (!icons[count]) {
    // @ts-ignore
    icons[count] = L.divIcon({
      className: '',
      html: `<div class="cluster-marker bg-lightBlack flex flex-wrap text-gold border-gold border-solid border-2 justify-center items-center rounded-full max-w-6 max-h-6" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`
    });
  }
  // @ts-ignore
  return icons[count];
};

const markerIcon = L.icon({
  iconUrl: dotMaker,
  shadowUrl: foodtrucks_icon,
  iconSize: [8, 8],
  shadowAnchor: [18, 30]
});

const ShowFoodtrucks = ({ foodtrucks }: { foodtrucks: FoodtruckState[] }) => {
  const maxZoom = 22;
  const [bounds, setBounds] = useState<BBox>([]);
  const [zoom, setZoom] = useState(12);
  const map = useMap();
  let points: any[] = [];

  const updateMap = () => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ]);
    setZoom(map.getZoom());
  };

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  points = foodtrucks.map(({ id, menu, location }) => ({
    type: 'Feature',
    properties: { cluster: false, foodtruckId: id, category: menu.kitchenType[0].name },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(`${location.coordinates.longitude}`),
        parseFloat(`${location.coordinates.latitude}`)
      ]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 }
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(pointCount, 10 + (pointCount / points.length) * 50)}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true
                  });
                }
              }}
            />
          );
        }

        return (
          <Marker
            key={`foodtruck-${cluster.properties.foodtruckId}`}
            position={[latitude, longitude]}
            icon={markerIcon}
          />
        );
      })}
    </>
  );
};

export default ShowFoodtrucks;
