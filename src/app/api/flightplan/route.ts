import { NextResponse } from 'next/server';

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
    const response = await fetch(
      `https://www.simbrief.com/api/xml.fetcher.php?username=${USERNAME}`
    );

    if (!response.ok) {
      throw new Error(`SimBrief API error! Status: ${response.status}`);
    }

    const xmlText = await response.text();

    // Server-safe XML extraction helpers (avoid DOMParser in Node)
    const extractTag = (xml: string, tag: string) => {
      const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
      const m = xml.match(re);
      return m ? m[1].trim() : null;
    };

    const extractAll = (xml: string, tag: string) => {
      const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'gi');
      const matches = [];
      let m;
      while ((m = re.exec(xml))) {
        matches.push(m[1].trim());
      }
      return matches;
    };

    // Find the OFP block; fall back to full xml if not wrapped
    const ofpText = extractTag(xmlText, 'OFP') || xmlText;

    // Check status under OFP > fetch > status
    const fetchBlock = extractTag(ofpText, 'fetch');
    const status = fetchBlock ? extractTag(fetchBlock, 'status') : null;
    if (status !== 'Success') {
      const errorMsg =
        (fetchBlock && extractTag(fetchBlock, 'error')) || 'Unknown API error.';
      return NextResponse.json({ error: errorMsg }, { status: 500 });
    }

    // Extract main nodes
    const generalText = extractTag(ofpText, 'general');
    const originText = extractTag(ofpText, 'origin');
    const destText = extractTag(ofpText, 'destination');
    const navlogText = extractTag(ofpText, 'navlog') || '';

    if (!generalText || !originText || !destText) {
      return NextResponse.json(
        { error: 'Failed to parse flight plan data.' },
        { status: 500 }
      );
    }

    const toNumber = (s: string | null) => {
      if (!s) return NaN;
      const n = Number(s.trim());
      return Number.isFinite(n) ? n : NaN;
    };

    const flightPlan = {
      id:
        (extractTag(ofpText, 'params') &&
          extractTag(extractTag(ofpText, 'params')!, 'request_id')) ||
        '',
      origin: {
        lat: toNumber(extractTag(originText, 'lat')),
        lon: toNumber(extractTag(originText, 'lon')),
        ident: extractTag(originText, 'icao_code') || '',
      },
      destination: {
        lat: toNumber(extractTag(destText, 'lat')),
        lon: toNumber(extractTag(destText, 'lon')),
        ident: extractTag(destText, 'icao_code') || '',
      },
      route: extractAll(navlogText, 'waypoint').map((wpText) => ({
        lat: toNumber(extractTag(wpText, 'lat')),
        lon: toNumber(extractTag(wpText, 'lon')),
        ident: extractTag(wpText, 'ident') || '',
      })),
      flightNumber: extractTag(generalText, 'flight_number') || '',
      departure: extractTag(originText, 'icao_code') || '',
      arrival: extractTag(destText, 'icao_code') || '',
    };

    return NextResponse.json([flightPlan]);
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch or parse flight plan.' },
      { status: 500 }
    );
  }
}
