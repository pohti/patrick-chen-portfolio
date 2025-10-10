'use client';

import { type City } from './types';

interface WeatherPopupProps {
  city: City;
}

export default function WeatherPopup({ city }: WeatherPopupProps) {
  // Get temperature color based on value
  const getTemperatureColor = (temp?: number): string => {
    if (!temp) return '#808080';
    if (temp < 0) return '#287aedff'; // Blue
    if (temp < 10) return '#3bf6e0ff'; // Light Blue
    if (temp < 20) return '#10B981'; // Green
    if (temp < 25) return '#c4e025ff'; // Light Green
    if (temp < 30) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  // Convert wind degree to direction
  const getWindDirection = (deg?: number): string => {
    if (!deg) return 'N/A';

    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  const temp = city.temperature ? `${city.temperature}°C` : 'N/A';
  const feelsLike = city.feels_like ? `${city.feels_like}°C` : 'N/A';
  const windSpeed = city.wind_speed ? `${city.wind_speed} m/s` : 'N/A';
  const windDirection = getWindDirection(city.wind_deg);
  const windDeg = city.wind_deg ? `${city.wind_deg}°` : 'N/A';
  const humidity = city.humidity ? `${city.humidity}%` : 'N/A';

  const fontSizeSmall = '10px';
  const fontSizeMedium = '12px';
  const fontSizeBig = '14px';

  return (
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minWidth: '250px',
        maxWidth: '280px',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #23262fff 0%, #506689ff 100%)',
          color: 'white',
          padding: '5px 5px',
          borderRadius: '5px 5px 0 0',
          textAlign: 'center',
        }}
      >
        <h3
          style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold' }}
        >
          {city.name}
        </h3>
        <p style={{ margin: '0', fontSize: '11px', opacity: '0.9' }}>
          {city.country}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '10px', background: 'white' }}>
        {/* Temperature Section */}
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <div
            style={{
              fontSize: fontSizeBig,
              fontWeight: 'bold',
              color: getTemperatureColor(city.temperature),
              marginBottom: '4px',
            }}
          >
            {temp}
          </div>
          <div
            style={{
              fontSize: fontSizeSmall,
              color: '#666',
              textTransform: 'capitalize',
            }}
          >
            {city.description || 'No description available'}
          </div>
        </div>

        {/* Weather Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: fontSizeSmall,
                color: '#666',
                marginBottom: '2px',
              }}
            >
              Feels Like
            </div>
            <div
              style={{
                fontSize: fontSizeBig,
                fontWeight: '600',
                color: '#333',
              }}
            >
              {feelsLike}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: fontSizeSmall,
                color: '#666',
                marginBottom: '2px',
              }}
            >
              Humidity
            </div>
            <div
              style={{
                fontSize: fontSizeBig,
                fontWeight: '600',
                color: '#333',
              }}
            >
              {humidity}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: fontSizeSmall,
                color: '#666',
                marginBottom: '2px',
              }}
            >
              Wind Speed
            </div>
            <div
              style={{
                fontSize: fontSizeBig,
                fontWeight: '600',
                color: '#333',
              }}
            >
              {windSpeed}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: fontSizeSmall,
                color: '#666',
                marginBottom: '2px',
              }}
            >
              Wind Direction
            </div>
            <div
              style={{
                fontSize: fontSizeBig,
                fontWeight: '600',
                color: '#333',
              }}
            >
              {windDirection}
            </div>
          </div>

          <div style={{ textAlign: 'center', gridColumn: 'span 2' }}>
            <div
              style={{
                fontSize: fontSizeSmall,
                color: '#666',
                marginBottom: '2px',
              }}
            >
              Wind Degree
            </div>
            <div
              style={{
                fontSize: fontSizeBig,
                fontWeight: '600',
                color: '#333',
              }}
            >
              {windDeg}
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            paddingTop: '12px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: fontSizeSmall,
              color: '#666',
              marginBottom: '4px',
            }}
          >
            Coordinates
          </div>
          <div
            style={{
              fontSize: fontSizeMedium,
              color: '#333',
              fontFamily: 'monospace',
            }}
          >
            {city.lat.toFixed(4)}°, {city.lng.toFixed(4)}°
          </div>
        </div>
      </div>
    </div>
  );
}
