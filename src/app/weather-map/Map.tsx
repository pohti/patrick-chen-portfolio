'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '@/lib/cities';

// Fix for default markers in Leaflet with Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet-images/marker-icon-2x.png',
  iconUrl: '/leaflet-images/marker-icon.png',
  shadowUrl: '/leaflet-images/marker-shadow.png',
});

interface MapProps {
  cities: City[];
}

export default function Map({ cities }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: true,
      attributionControl: true,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Get temperature color based on value
    const getTemperatureColor = (temp?: number): string => {
      if (!temp) return '#808080';
      if (temp < 10) return '#3B82F6'; // Blue
      if (temp < 20) return '#10B981'; // Green
      if (temp < 30) return '#F59E0B'; // Yellow
      return '#EF4444'; // Red
    };

    // Create custom icon for city markers
    const createCityIcon = (city: City) => {
      const color = getTemperatureColor(city.temperature);
      const temp = city.temperature ? `${city.temperature}°C` : 'N/A';

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background: white;
            border: 2px solid ${color};
            border-radius: 8px;
            padding: 4px 8px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
            min-width: 60px;
          ">
            <div style="color: ${color}; font-size: 11px;">${city.name}</div>
            <div style="color: ${color}; font-size: 10px;">${temp}</div>
          </div>
        `,
        iconSize: [60, 40],
        iconAnchor: [30, 40],
      });
    };

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add city markers
    cities.forEach((city) => {
      if (mapRef.current) {
        const marker = L.marker([city.lat, city.lng], {
          icon: createCityIcon(city),
        });

        const temp = city.temperature
          ? `${city.temperature}°C`
          : 'Temperature unavailable';
        marker.bindPopup(`
          <div style="text-align: center; font-family: sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #333;">${city.name}, ${city.country}</h3>
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${getTemperatureColor(city.temperature)};">
              ${temp}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
              ${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°
            </p>
          </div>
        `);

        marker.addTo(mapRef.current);
      }
    });
  }, [cities]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
