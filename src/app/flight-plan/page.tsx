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

const fetchLatestFlightPlan = async (): Promise<FlightPlanData[]> => {
  const res = await fetch('/api/flightplan');
  if (!res.ok) {
    throw new Error(`Failed to fetch flight plans: ${res.status}`);
  }
  const data = await res.json();
  // Optionally validate/normalize data here if needed
  return data as FlightPlanData[];
};

// Dynamically import map components to avoid SSR errors
const Map = dynamic(() => import('./MapComponent'), { ssr: false });

const Home = () => {
  const [flightPlans, setFlightPlans] = useState<FlightPlanData[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<FlightPlanData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all flight plans for the user
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const plans = await fetchLatestFlightPlan(); // Use the corrected function
        setFlightPlans(plans);
        if (plans.length > 0) {
          setSelectedPlanId(plans[0].id);
        } else {
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

  // Update selected plan when selectedPlanId changes
  useEffect(() => {
    const plan = flightPlans.find((p) => p.id === selectedPlanId) || null;
    setSelectedPlan(plan);
  }, [selectedPlanId, flightPlans]);

  // Map center/zoom logic
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(6);

  useEffect(() => {
    if (selectedPlan && selectedPlan.route.length > 0) {
      const routeLats = selectedPlan.route.map((p) => p.lat);
      const routeLons = selectedPlan.route.map((p) => p.lon);
      const minLat = Math.min(...routeLats);
      const maxLat = Math.max(...routeLats);
      const minLon = Math.min(...routeLons);
      const maxLon = Math.max(...routeLons);
      const centerLat = (minLat + maxLat) / 2;
      const centerLon = (minLon + maxLon) / 2;
      setMapCenter([centerLat, centerLon]);
      setMapZoom(6);
    }
  }, [selectedPlan]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-stretch justify-center p-4 gap-4">
      {/* Sidebar for flight plan selection */}
      <div className="bg-white rounded-xl shadow-lg p-4 w-full md:w-80 mb-4 md:mb-0 flex-shrink-0">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Your Flight Plans
        </h2>
        {isLoading && <div className="text-gray-500">Loading...</div>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg mb-2">
            {error}
          </div>
        )}
        <ul className="space-y-2">
          {flightPlans.map((plan) => (
            <li key={plan.id}>
              <button
                className={`w-full text-left p-3 rounded-lg border ${
                  selectedPlanId === plan.id
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-gray-50 text-gray-800 border-gray-300 hover:bg-blue-100'
                }`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {plan.flightNumber ? `${plan.flightNumber}: ` : ''}
                {plan.departure} → {plan.arrival}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Map Container */}
      <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-lg h-[60vh] md:h-[70vh] flex-grow flex flex-col gap-4">
        {selectedPlan ? (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-2 w-full max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">
                {selectedPlan.flightNumber
                  ? `Flight ${selectedPlan.flightNumber}`
                  : 'Flight Plan'}
              </h3>
              <div className="flex flex-row items-center gap-4 mb-2">
                <span className="font-semibold text-gray-700">Origin:</span>
                <span className="px-2 py-1 bg-blue-100 rounded text-blue-800 font-mono">
                  {selectedPlan.origin.ident}
                </span>
                <span className="text-gray-500">
                  ({selectedPlan.origin.lat}, {selectedPlan.origin.lon})
                </span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="font-semibold text-gray-700">
                  Destination:
                </span>
                <span className="px-2 py-1 bg-green-100 rounded text-green-800 font-mono">
                  {selectedPlan.destination.ident}
                </span>
                <span className="text-gray-500">
                  ({selectedPlan.destination.lat},{' '}
                  {selectedPlan.destination.lon})
                </span>
              </div>
              <div className="flex gap-6 mb-4">
                <div>
                  <span className="font-semibold text-gray-700">
                    Departure:
                  </span>
                  <span className="ml-2 text-gray-800">
                    {selectedPlan.departure}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Arrival:</span>
                  <span className="ml-2 text-gray-800">
                    {selectedPlan.arrival}
                  </span>
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 mb-2 block">
                  Waypoints:
                </span>
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
                      {selectedPlan.route.map((wp, idx) => (
                        <tr
                          key={idx}
                          className={
                            idx === 0
                              ? 'bg-blue-50'
                              : idx === selectedPlan.route.length - 1
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
              </div>
            </div>
            <Map
              center={mapCenter || [0, 0]}
              zoom={mapZoom}
              route={selectedPlan.route}
            />
          </>
        ) : (
          <div className="bg-white h-full w-full flex items-center justify-center text-gray-500 text-lg">
            {isLoading
              ? 'Fetching data...'
              : 'Select a flight plan to view its route.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
