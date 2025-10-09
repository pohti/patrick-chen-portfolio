import { type City, majorCities } from './cities';
import weatherCache from './cache';

// OpenWeatherMap API configuration
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export async function fetchWeatherForCity(city: City): Promise<number | null> {
  // Create cache key for this city
  const cacheKey = `weather_${city.lat}_${city.lng}`;
  
  // Check cache first
  const cachedData = weatherCache.get<OpenWeatherMapResponse>(cacheKey);
  console.log({cacheKey, cachedData});
  if (cachedData) {
    console.log(`Using cached weather data for ${city.name}`);
    return Math.round(cachedData.main.temp);
  }

  // If API key is available, use real API
  if (API_KEY) {
    try {
      const response = await fetch(
        `${BASE_URL}?lat=${city.lat}&lon=${city.lng}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        console.log('Response not ok:', response.statusText);
        throw new Error('Weather API request failed');
      }
      
      const data: OpenWeatherMapResponse = await response.json();

      // Cache the response for 2 hours
      weatherCache.set(cacheKey, data, 120);
      
      return Math.round(data.main.temp);
    } catch (error) {
      console.error(`Failed to fetch weather for ${city.name}:`, error);
      return null;
    }
  }

  return null;
}

export async function fetchWeatherForAllCities(): Promise<City[]> {
  const citiesWithWeather = await Promise.all(
    majorCities.map(async (city) => {
      const temperature = await fetchWeatherForCity(city);
      return {
        ...city,
        temperature: temperature ?? undefined,
      };
    })
  );
  
  return citiesWithWeather;
}

// Simulate real-time updates by adding small random variations
export function addTemperatureVariation(temperature: number): number {
  const variation = (Math.random() - 0.5) * 2; // ±1 degree variation
  return Math.round(temperature + variation);
}

// Get detailed weather data from cache or API
export async function fetchDetailedWeatherForCity(city: City): Promise<OpenWeatherMapResponse | null> {
  const cacheKey = `weather_${city.lat}_${city.lng}`;
  
  // Check cache first
  const cachedData = weatherCache.get<OpenWeatherMapResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // If API key is available, use real API
  if (API_KEY) {
    try {
      const response = await fetch(
        `${BASE_URL}?lat=${city.lat}&lon=${city.lng}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      
      const data: OpenWeatherMapResponse = await response.json();
      
      // Cache the response for 30 minutes
      weatherCache.set(cacheKey, data, 30);
      
      return data;
    } catch (error) {
      console.error(`Failed to fetch detailed weather for ${city.name}:`, error);
      return null;
    }
  }
  
  return null;
}