'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Remove this line from imports:
// import { fetchLatestFlightPlan, FlightPlanData } from './flightplanApi';

// Add local types and client-side fetch that calls the new route
type Waypoint = {
  lat: number;
  lon: number;
  ident: string;
};

export type FlightPlanData = {
  id: string;
  origin: { lat: number; lon: number; ident: string };
  destination: { lat: number; lon: number; ident: string };
  route: Waypoint[];
  flightNumber: string;
  departure: string;
  arrival: string;
};

const fetchLatestFlightPlan = async (): Promise<FlightPlanData> => {
  const res = await fetch('/api/flightplan');
  if (!res.ok) {
    throw new Error(`Failed to fetch flight plan: ${res.status}`);
  }
  const data = await res.json();
  return data as FlightPlanData;
};

// Dynamically import map components to avoid SSR errors
const Map = dynamic(() => import('./MapComponent'), { ssr: false });

const Home = () => {
  const [flightPlan, setFlightPlan] = useState<FlightPlanData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Collapsible waypoints state
  const [showWaypoints, setShowWaypoints] = useState<boolean>(false);

  // Fetch all flight plans for the user
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const plan = await fetchLatestFlightPlan();
        console.log('Fetched flight plan:', plan);
        setFlightPlan(plan);
        if (!plan || !plan.id) {
          setError('No flight plan found for the user.');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch flight plans.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Keep selectedPlan in sync with fetched flightPlan
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const plan = flightPlan || null;
  }, [flightPlan]);

  // Map center/zoom logic (updated to use either selectedPlan.route or MOCK_ROUTE)
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(6);

  useEffect(() => {
    const activeRoute = flightPlan?.route || [];

    if (activeRoute && activeRoute.length > 0) {
      const routeLats = activeRoute
        .map((p: Waypoint) => p.lat)
        .filter((v: number) => Number.isFinite(v));
      const routeLons = activeRoute
        .map((p: Waypoint) => p.lon)
        .filter((v: number) => Number.isFinite(v));
      if (routeLats.length === 0 || routeLons.length === 0) {
        return;
      }
      const minLat = Math.min(...routeLats);
      const maxLat = Math.max(...routeLats);
      const minLon = Math.min(...routeLons);
      const maxLon = Math.max(...routeLons);
      const centerLat = (minLat + maxLat) / 2;
      const centerLon = (minLon + maxLon) / 2;
      setMapCenter([centerLat, centerLon]);
      setMapZoom(6);
    }
  }, [flightPlan]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-stretch justify-center p-4 gap-4">
      {/* Sidebar for flight plan selection */}
      <div className="bg-white rounded-xl shadow-lg p-4 w-full md:w-80 mb-4 md:mb-0 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Flight Plan</h2>
        {isLoading && <div className="text-gray-500">Loading...</div>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-2">
            {error}
          </div>
        )}
        {flightPlan && (
          <div className="p-3 rounded-lg border bg-gray-50 text-gray-800">
            <div className="font-bold">
              {flightPlan.flightNumber ? `${flightPlan.flightNumber}: ` : ''}
              {flightPlan.departure} → {flightPlan.arrival}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {flightPlan.origin.ident} → {flightPlan.destination.ident}
            </div>
          </div>
        )}
      </div>
      {/* Map Container */}
      <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg h-[60vh] md:h-[70vh] flex-grow flex flex-col gap-4">
        {flightPlan ? (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-2 w-full max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">
                {flightPlan.flightNumber
                  ? `Flight ${flightPlan.flightNumber}`
                  : 'Flight Plan'}
              </h3>
              <div className="flex flex-row items-center gap-4 mb-2">
                <span className="font-semibold text-gray-700">Origin:</span>
                <span className="px-2 py-1 bg-blue-100 rounded text-blue-800 font-mono">
                  {flightPlan.origin.ident}
                </span>
                <span className="text-gray-500">
                  ({flightPlan.origin.lat}, {flightPlan.origin.lon})
                </span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="font-semibold text-gray-700">
                  Destination:
                </span>
                <span className="px-2 py-1 bg-green-100 rounded text-green-800 font-mono">
                  {flightPlan.destination.ident}
                </span>
                <span className="text-gray-500">
                  ({flightPlan.destination.lat}, {flightPlan.destination.lon})
                </span>
              </div>
              <div className="flex gap-6 mb-4">
                <div>
                  <span className="font-semibold text-gray-700">
                    Departure:
                  </span>
                  <span className="ml-2 text-gray-800">
                    {flightPlan.departure}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Arrival:</span>
                  <span className="ml-2 text-gray-800">
                    {flightPlan.arrival}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Waypoints</span>
                  <button
                    type="button"
                    aria-expanded={showWaypoints}
                    onClick={() => setShowWaypoints((s) => !s)}
                    className="text-sm px-2 py-1 rounded-md border bg-gray-50 hover:bg-gray-100"
                  >
                    {showWaypoints ? 'Hide' : 'Show'} ({flightPlan.route.length}
                    )
                  </button>
                </div>

                {showWaypoints && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border border-gray-200 rounded">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-2 py-1 text-left">Ident</th>
                          <th className="px-2 py-1 text-left">Latitude</th>
                          <th className="px-2 py-1 text-left">Longitude</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flightPlan.route.map((wp, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx === 0
                                ? 'bg-blue-50'
                                : idx === flightPlan.route.length - 1
                                  ? 'bg-green-50'
                                  : ''
                            }
                          >
                            <td className="px-2 py-1 font-mono">{wp.ident}</td>
                            <td className="px-2 py-1">{wp.lat}</td>
                            <td className="px-2 py-1">{wp.lon}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <Map
              center={mapCenter || [0, 0]}
              zoom={mapZoom}
              route={flightPlan?.route || []}
            />
          </>
        ) : (
          <div className="bg-white h-full w-full flex items-center justify-center text-gray-500 text-lg">
            {isLoading ? 'Fetching data...' : 'No flight plan available.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
