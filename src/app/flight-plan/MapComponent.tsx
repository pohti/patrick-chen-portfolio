import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
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
