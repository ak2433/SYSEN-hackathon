#!/usr/bin/env node
/**
 * Derive shipment_event_log rows from data/semiconductor_shipments_500(1).csv
 * and insert them into Supabase. Creates 2 events per shipment:
 *   1. Departure (AF) at departure_time from origin
 *   2. Last known event (EDI code) at actual_arrival_time or planned_arrival_time with telemetry
 *
 * Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (or ANON key)
 * Run after loading shipments: node data/load_shipment_events_to_supabase.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath = join(__dirname, 'semiconductor_shipments_500(1).csv');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY)');
  process.exit(1);
}

const raw = readFileSync(csvPath, 'utf-8');
const rows = parse(raw, { columns: true, skip_empty_lines: true, trim: true });

function toNum(v) {
  if (v === '' || v == null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}
function toInt(v) {
  const n = toNum(v);
  return n == null ? null : Math.round(n);
}
function toTs(v) {
  if (v === '' || v == null) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
function str(v) {
  if (v === '' || v == null) return null;
  return String(v).trim();
}

/** Build status_note from weather_event and geopolitical_event (skip "None") */
function statusNote(r) {
  const parts = [str(r.weather_event), str(r.geopolitical_event)]
    .filter((s) => s && s !== 'None');
  return parts.length ? parts.join('; ') : null;
}

const events = [];
for (const r of rows) {
  const shipmentId = str(r.shipment_id);
  if (!shipmentId) continue;

  const departureTime = toTs(r.departure_time);
  const plannedArrival = toTs(r.planned_arrival_time);
  const actualArrival = toTs(r.actual_arrival_time);
  const lastEventTime = actualArrival || plannedArrival || departureTime;

  const originSite = str(r.origin_site) || str(r.origin_city);
  const currentLocation = str(r.current_location);
  const destinationSite = str(r.destination_site);
  const site = currentLocation || destinationSite || originSite;

  const tempC = toNum(r.temp_c_recorded);
  const humidityPct = toNum(r.humidity_pct_recorded);
  const shockG = toNum(r.shock_g_max_recorded);
  const exceptionFlag = toInt(r.shock_exception_flag) ?? 0;
  const ediCode = str(r.edi_last_event_code);

  // 1. Departure event (AF = Carrier Departed Pickup)
  if (departureTime) {
    events.push({
      shipment_id: shipmentId,
      event_timestamp: departureTime,
      event_type: 'AF',
      site: originSite,
      status_note: null,
      temperature_c: null,
      humidity_pct: null,
      shock_g: null,
      exception_flag: 0,
    });
  }

  // 2. Last known event (EDI code, with telemetry when present)
  if (lastEventTime) {
    events.push({
      shipment_id: shipmentId,
      event_timestamp: lastEventTime,
      event_type: ediCode || 'SCAN',
      site,
      status_note: statusNote(r),
      temperature_c: tempC,
      humidity_pct: humidityPct,
      shock_g: shockG,
      exception_flag: exceptionFlag,
    });
  }
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const batchSize = 100;
  let inserted = 0;
  for (let i = 0; i < events.length; i += batchSize) {
    const batch = events.slice(i, i + batchSize);
    const { error } = await supabase.from('shipment_event_log').insert(batch);
    if (error) {
      console.error('Insert error:', error);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`Inserted ${inserted}/${events.length} event rows`);
  }
  console.log('Done. Total rows in shipment_event_log:', inserted);
}

main();
