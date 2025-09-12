export interface Waypoint {
  lat: number;
  lon: number;
  ident: string;
}

export interface FlightPlanData {
  id: string;
  origin: Waypoint;
  destination: Waypoint;
  route: Waypoint[];
  flightNumber?: string;
  departure?: string;
  arrival?: string;
}
