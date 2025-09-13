import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngExpression } from 'leaflet';

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Waypoint {
  lat: number;
  lon: number;
  ident: string;
}

interface MapProps {
  center: [number, number];
  zoom: number;
  route: Waypoint[];
}

const MapComponent = ({ center, zoom, route }: MapProps) => {
  // Child component to recenter the map when `center` or `zoom` change.
  const Recenter = ({
    center,
    zoom,
  }: {
    center: [number, number];
    zoom: number;
  }) => {
    const map = useMap();
    // setView will move the map even after initial mount
    React.useEffect(() => {
      if (center && Array.isArray(center) && center.length === 2) {
        map.setView(center as LatLngExpression, zoom);
      }
    }, [center, zoom, map]);
    return null;
  };
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Recenter center={center} zoom={zoom} />
      <Polyline
        positions={route.map((p) => [p.lat, p.lon]) as LatLngExpression[]}
        color="#3b82f6"
        weight={4}
      />
      {route.map((p, index) => (
        <Marker
          key={index}
          position={[p.lat, p.lon] as LatLngExpression}
          title={p.ident}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
