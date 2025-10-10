'use client';

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherPopup.css';
import { type City } from './types';
import WeatherPopup from './WeatherPopup';

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

  // Helper function to create React popup content
  const createPopupContent = (city: City): HTMLElement => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<WeatherPopup city={city} />);
    return div;
  };

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
        iconSize: [120, 24],
        iconAnchor: [60, 24],
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

        // Create popup with React component
        const popupContent = createPopupContent(city);
        marker.bindPopup(popupContent, {
          maxWidth: 350,
          className: 'weather-popup',
        });

        marker.addTo(mapRef.current);
      }
    });
  }, [cities]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full relative"
      style={{ minHeight: '400px' }}
    >
      {/* Temperature Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          padding: '12px',
          zIndex: 1000,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '12px',
          minWidth: '140px',
          background: 'rgba(255,255,255,0.75)',
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#333',
            textAlign: 'center',
          }}
        >
          Temperature (°C)
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            color: '#3f3f3fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#EF4444',
                borderRadius: '3px',
              }}
            />
            <span>30°+ Hot</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#F59E0B',
                borderRadius: '3px',
              }}
            />
            <span>25° - 30° Warm</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#c4e025ff',
                borderRadius: '3px',
              }}
            />
            <span>20° - 25° Mild</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#10B981',
                borderRadius: '3px',
              }}
            />
            <span>10° - 20° Cool</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#3bf6e0ff',
                borderRadius: '3px',
              }}
            />
            <span>0° - 10° Cold</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#287aedff',
                borderRadius: '3px',
              }}
            />
            <span>&lt; 0° Freezing</span>
          </div>
        </div>
      </div>
    </div>
  );
}
