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
      zoom: 3,
      minZoom: 3, // Prevent zooming out beyond level 3
      maxZoom: 18, // Optional: also limit zoom in
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
      if (temp < 0) return '#287aedff'; // Blue
      if (temp < 10) return '#3bf6e0ff'; // Blue
      if (temp < 20) return '#10B981'; // Green
      if (temp < 25) return '#c4e025ff'; // Green
      if (temp < 30) return '#F59E0B'; // Yellow
      return '#EF4444'; // Red
    };

    // Create custom icon for city markers
    const createCityIcon = (city: City) => {
      const temperatureColor = getTemperatureColor(city.temperature);
      const temp = city.temperature ? `${city.temperature}°` : 'N/A';

      // Calculate approximate width based on content
      const tempWidth = temp.length * 7 + 10; // ~7px per char + padding
      const nameWidth = city.name.length * 5 + 8; // ~6px per char + padding
      const totalWidth = tempWidth + nameWidth + 8; // extra margin
      console.log({ tempWidth, nameWidth, totalWidth });

      // Set minimum and maximum width constraints
      const minWidth = 60;
      const maxWidth = 200;
      const dynamicWidth = Math.max(minWidth, Math.min(maxWidth, totalWidth));

      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            display: flex;
            align-items: center;
            padding: 1.5px;
            font-family: system-ui, -apple-system, sans-serif;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
          ">
            <div style="
              color: #fff;
              background-color: #1e1e1e;
              padding: 2px 4px;
              font-size: 11px;
              border-radius: 5px 0 0 5px;
            ">${temp}</div>
            <div style="
              background: ${temperatureColor};
              padding: 2px 4px;
              color: white;
              font-size: 11px;
              border-radius: 0 5px 5px 0;
              text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            ">${city.name}</div>
          </div>
        `,
        iconSize: [dynamicWidth, 24], // Dynamic width based on content
        iconAnchor: [dynamicWidth / 2, 24], // Center horizontally, bottom vertically
      });
    };

    // Clear existing markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // TODO: improve the popup design and details
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
