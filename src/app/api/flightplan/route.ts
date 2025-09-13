import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';

/**
 * Server-side function to fetch the latest flight plan from SimBrief.
 * This route handler acts as a secure proxy to the SimBrief API.
 */
export async function GET() {
  const USERNAME = process.env.SIMBRIEF_USER_ID;

  if (!USERNAME) {
    return NextResponse.json(
      { error: 'SIMBRIEF_USER_ID is not configured.' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Fetch the initial response to get the URL(s) for the full OFP file(s).
    const initialResponse = await fetch(
      `https://www.simbrief.com/api/xml.fetcher.php?username=${USERNAME}`
    );

    if (!initialResponse.ok) {
      throw new Error(`SimBrief API error! Status: ${initialResponse.status}`);
    }

    const initialXmlText = await initialResponse.text();
    const initialResult = await parseStringPromise(initialXmlText, {
      explicitArray: false,
      mergeAttrs: true,
    });

    // The response may contain multiple <OFP> entries. Normalize to an array.
    const ofpEntries = initialResult?.OFP
      ? Array.isArray(initialResult.OFP)
        ? initialResult.OFP
        : [initialResult.OFP]
      : [];

    // Find the first successful OFP entry and return only that plan
    let selectedOfpUrl: string | null = null;
    for (const entry of ofpEntries) {
      const status = entry?.fetch?.status;
      const url = entry?.params?.xml_file;
      if (status === 'Success' && url) {
        selectedOfpUrl = url;
        break; // only take the first successful one
      }
    }

    if (!selectedOfpUrl) {
      const errorMsg =
        initialResult?.OFP?.fetch?.error ||
        'No flight plans found for this user.';
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    // Fetch and parse the single OFP XML
    const ofpResp = await fetch(selectedOfpUrl);
    if (!ofpResp.ok) {
      throw new Error(`Failed to fetch OFP XML: ${selectedOfpUrl}`);
    }
    const ofpXmlText = await ofpResp.text();
    const parsed = await parseStringPromise(ofpXmlText, {
      explicitArray: false,
      mergeAttrs: true,
    });

    const ofp = parsed?.OFP || {};
    const originData = ofp.origin || {};
    const destinationData = ofp.destination || {};
    const generalData = ofp.general || {};
    const navlogData = ofp.navlog || {};

    const rawWaypoints = navlogData?.fix;
    const waypointsArray = rawWaypoints
      ? Array.isArray(rawWaypoints)
        ? rawWaypoints
        : [rawWaypoints]
      : [];

    const flightPlan = {
      id: ofp.params?.request_id || '',
      origin: {
        lat: Number(originData.pos_lat) || 0,
        lon: Number(originData.pos_long) || 0,
        ident: originData.icao_code || '',
      },
      destination: {
        lat: Number(destinationData.pos_lat) || 0,
        lon: Number(destinationData.pos_long) || 0,
        ident: destinationData.icao_code || '',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      route: waypointsArray.map((wp: any) => ({
        lat: Number(wp.pos_lat) || 0,
        lon: Number(wp.pos_long) || 0,
        ident: wp.ident || '',
      })),
      flightNumber: generalData.flight_number || '',
      departure: originData.icao_code || '',
      arrival: destinationData.icao_code || '',
    };

    return NextResponse.json(flightPlan);
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch or parse flight plan.' },
      { status: 500 }
    );
  }
}
