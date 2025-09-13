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
  // Validate center: ensure it's two finite numbers
  const isValidCenter =
    Array.isArray(center) &&
    center.length === 2 &&
    Number.isFinite(center[0]) &&
    Number.isFinite(center[1]);
  const safeCenter: [number, number] = isValidCenter ? center : [0, 0];

  // Prepare validated positions for polyline/markers
  const positions: LatLngExpression[] = route
    .map((p) => [Number(p.lat), Number(p.lon)] as LatLngExpression)
    .filter(
      (pt) =>
        Array.isArray(pt) &&
        Number.isFinite(pt[0] as number) &&
        Number.isFinite(pt[1] as number)
    );
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
      try {
        if (
          center &&
          Array.isArray(center) &&
          center.length === 2 &&
          Number.isFinite(center[0]) &&
          Number.isFinite(center[1])
        ) {
          map.setView(center as LatLngExpression, zoom);
        }
      } catch (err) {
        // Swallow mapping errors to avoid breaking the page
        console.error('Map setView error', err);
      }
    }, [center, zoom, map]);
    return null;
  };

  // If we don't have a valid center and no valid positions, avoid mounting Leaflet
  if (!isValidCenter && positions.length === 0) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#999' }}>Map unavailable</div>
      </div>
    );
  }
  return (
    <MapContainer
      center={safeCenter}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Recenter center={safeCenter} zoom={zoom} />
      {positions.length > 0 && (
        <Polyline positions={positions} color="#3b82f6" weight={4} />
      )}
      {positions.map((pos, index) => (
        <Marker key={index} position={pos} />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
