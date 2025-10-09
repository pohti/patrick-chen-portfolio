// Major cities around the world with their coordinates
export interface City {
  name: string;
  country: string;
  lat: number;
  lng: number;
  temperature?: number;
}

export const majorCities: City[] = [
  // North America
  { name: 'New York', country: 'US', lat: 40.7128, lng: -74.006 },
  // { name: "Los Angeles", country: "US", lat: 34.0522, lng: -118.2437 },
  // { name: "Chicago", country: "US", lat: 41.8781, lng: -87.6298 },
  // { name: "Toronto", country: "CA", lat: 43.6532, lng: -79.3832 },
  // { name: "Mexico City", country: "MX", lat: 19.4326, lng: -99.1332 },

  // // Europe
  // { name: "London", country: "GB", lat: 51.5074, lng: -0.1278 },
  // { name: "Paris", country: "FR", lat: 48.8566, lng: 2.3522 },
  // { name: "Berlin", country: "DE", lat: 52.5200, lng: 13.4050 },
  // { name: "Madrid", country: "ES", lat: 40.4168, lng: -3.7038 },
  // { name: "Rome", country: "IT", lat: 41.9028, lng: 12.4964 },

  // // Asia
  // { name: "Tokyo", country: "JP", lat: 35.6762, lng: 139.6503 },
  // { name: "Beijing", country: "CN", lat: 39.9042, lng: 116.4074 },
  // { name: "Shanghai", country: "CN", lat: 31.2304, lng: 121.4737 },
  // { name: "Mumbai", country: "IN", lat: 19.0760, lng: 72.8777 },
  // { name: "Seoul", country: "KR", lat: 37.5665, lng: 126.9780 },

  // // South America
  // { name: "São Paulo", country: "BR", lat: -23.5558, lng: -46.6396 },
  // { name: "Buenos Aires", country: "AR", lat: -34.6118, lng: -58.3960 },
  // { name: "Lima", country: "PE", lat: -12.0464, lng: -77.0428 },

  // // More Europe
  // { name: "Amsterdam", country: "NL", lat: 52.3676, lng: 4.9041 },
  // { name: "Stockholm", country: "SE", lat: 59.3293, lng: 18.0686 },
  // { name: "Moscow", country: "RU", lat: 55.7558, lng: 37.6176 },

  // // More Asia
  // { name: "Delhi", country: "IN", lat: 28.7041, lng: 77.1025 },
  // { name: "Bangkok", country: "TH", lat: 13.7563, lng: 100.5018 },
  // { name: "Singapore", country: "SG", lat: 1.3521, lng: 103.8198 },
  // { name: "Hong Kong", country: "HK", lat: 22.3193, lng: 114.1694 },

  // // Middle East & Africa
  // { name: "Dubai", country: "AE", lat: 25.2048, lng: 55.2708 },
  // { name: "Istanbul", country: "TR", lat: 41.0082, lng: 28.9784 },
  // { name: "Cairo", country: "EG", lat: 30.0444, lng: 31.2357 },
  // { name: "Lagos", country: "NG", lat: 6.5244, lng: 3.3792 },
  // { name: "Johannesburg", country: "ZA", lat: -26.2041, lng: 28.0473 },

  // // Oceania
  // { name: "Sydney", country: "AU", lat: -33.8688, lng: 151.2093 },
  // { name: "Melbourne", country: "AU", lat: -37.8136, lng: 144.9631 },
  // { name: "Auckland", country: "NZ", lat: -36.8485, lng: 174.7633 },
];
