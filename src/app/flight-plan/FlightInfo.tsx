import React from 'react';
import styles from './flightplan.module.css';
import { FlightPlanData } from './page';
import FlightInfoCard from './FlightInfoCard';

interface Props {
  flightPlan: FlightPlanData;
}

const FlightInfo = ({ flightPlan }: Props) => {
  // Collapsible waypoints state
  // const [showWaypoints, setShowWaypoints] = useState<boolean>(false);

  return (
    // <div
    //   className={`${styles.detailCard} rounded-xl mb-2 w-full max-w-2xl mx-auto`}
    // >
    //   <h3 className={`${styles.flightHeading} text-2xl mb-2`}>
    //     {flightPlan.flightNumber
    //       ? `Flight ${flightPlan.flightNumber}`
    //       : 'Flight Plan'}
    //   </h3>
    //   <div className="flex flex-row items-center gap-4 mb-2">
    //     <div className={styles.infoRow}>
    //       <span className={styles.badge}>Origin</span>
    //       <div className="ml-2">
    //         <div className="font-semibold">{flightPlan.origin.ident}</div>
    //         <div className={styles.meta}>
    //           ({flightPlan.origin.lat}, {flightPlan.origin.lon})
    //         </div>
    //       </div>
    //     </div>
    //     <span className="mx-2 text-gray-400">→</span>
    //     <div className={styles.infoRow}>
    //       <span className={styles.badge}>Destination</span>
    //       <div className="ml-2">
    //         <div className="font-semibold">{flightPlan.destination.ident}</div>
    //         <div className={styles.meta}>
    //           ({flightPlan.destination.lat}, {flightPlan.destination.lon})
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex gap-6 mb-4">
    //     <div>
    //       <div className={styles.infoRow}>
    //         <span className={styles.badge}>Departure</span>
    //         <div className="ml-2 font-semibold">{flightPlan.departure}</div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className={styles.infoRow}>
    //         <span className={styles.badge}>Arrival</span>
    //         <div className="ml-2 font-semibold">{flightPlan.arrival}</div>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div className="flex items-center justify-between mb-2">
    //       <span className="font-semibold text-gray-700">Waypoints</span>
    //       <button
    //         type="button"
    //         aria-expanded={showWaypoints}
    //         onClick={() => setShowWaypoints((s) => !s)}
    //         className="text-sm px-2 py-1 rounded-md border bg-gray-50 hover:bg-gray-100"
    //       >
    //         {showWaypoints ? 'Hide' : 'Show'} ({flightPlan.route.length})
    //       </button>
    //     </div>

    //     {showWaypoints && (
    //       <div className="overflow-x-auto">
    //         <table className={styles.waypointsTable}>
    //           <thead>
    //             <tr>
    //               <th>Ident</th>
    //               <th>Latitude</th>
    //               <th>Longitude</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {flightPlan.route.map((wp, idx) => (
    //               <tr
    //                 key={idx}
    //                 className={
    //                   idx === 0
    //                     ? styles.rowFirst
    //                     : idx === flightPlan.route.length - 1
    //                       ? styles.rowLast
    //                       : ''
    //                 }
    //               >
    //                 <td className="font-mono">{wp.ident}</td>
    //                 <td>{wp.lat}</td>
    //                 <td>{wp.lon}</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className={`${styles.detailCard} rounded-xl w-full max-w-2xl mx-auto`}>
      <FlightInfoCard
        title="Flight Info"
        data={[
          { label: 'Flight Number', value: flightPlan.flightNumber || 'N/A' },
          { label: 'Callsign', value: 'ABCD' },
          { label: 'Departure', value: flightPlan.departure },
          { label: 'Arrival', value: flightPlan.arrival },
          { label: 'Alternate', value: 'ABCD' },
          { label: 'Aircraft', value: 'ABCD' },
          { label: 'Departure Date', value: 'ABCD' },
          { label: 'Departure', value: 'ABCD' },
          { label: 'Arrival', value: 'ABCD' },
          { label: 'Air Time', value: 'ABCD' },
          { label: 'Block Time', value: 'ABCD' },
          { label: 'Air Frame', value: 'ABCD' },
        ]}
      />
      <FlightInfoCard
        title="Flight Plan Summary"
        data={[
          { label: 'Initial Altitude', value: 'ABCD' },
          { label: 'Cruise Profile', value: 'ABCD' },
          { label: 'Route Distance', value: 'ABCD' },
          { label: 'Average Wind', value: 'ABCD' },
          { label: 'Wind Component', value: 'ABCD' },
          { label: 'ISA Deviation', value: 'ABCD' },
          { label: 'Release Number', value: 'ABCD' },
          { label: 'AIRAC Cycle', value: 'ABCD' },
          { label: 'OFP Layout', value: 'ABCD' },
          { label: 'Units', value: 'ABCD' },
          { label: 'Navlog', value: 'ABCD' },
          { label: 'ETOPS', value: 'ABCD' },
        ]}
      />
    </div>
  );
};

export default FlightInfo;
