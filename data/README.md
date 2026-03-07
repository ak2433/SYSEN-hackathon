# Semiconductor logistics data

This folder holds the source CSV and instructions for the three Supabase datasets defined in `semiconductor_research/chatgpt_project_suggestions.md`.

## Supabase tables (already created)

| Table | Dataset | Description |
|-------|---------|-------------|
| **shipments** | Dataset 1 | One row per shipment. Schema matches the CSV columns. |
| **shipment_event_log** | Dataset 2 | One row per event update (live tracking). Links to `shipments` via `shipment_id`. |
| **warehouse_operations** | Dataset 3 | One row per warehouse per time period (fulfillment metrics). |

## Loading the CSV into `shipments`

**Option A: Supabase Dashboard**

1. Open your project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. Go to **Table Editor** → **shipments**.
3. Click **Import data** (or **Insert** → **Import from CSV**).
4. Upload `semiconductor_shipments_500(1).csv`.
5. Map columns (names match the table); ensure date columns are parsed as timestamps.

**Option B: Scripts (requires Supabase URL + key)**

From the project root:

```bash
cd data
npm install
export SUPABASE_URL=https://your-project.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your_key

npm run load-shipments    # load CSV into shipments
npm run load-events       # derive and load shipment_event_log from same CSV (run after load-shipments)
```

## Deriving and loading Dataset 2 (shipment_event_log)

After **shipments** are loaded, run the event loader to derive event rows from the same CSV (2 events per shipment: departure + last known scan with telemetry):

```bash
cd data
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run load-events
```

- **Event 1:** Departure at `departure_time`, `event_type` = `AF`, `site` = origin.
- **Event 2:** Last known at `actual_arrival_time` or `planned_arrival_time`, `event_type` = EDI code (e.g. POD, OA, I1, XL, PR), `site` = `current_location` or destination; includes `temperature_c`, `humidity_pct`, `shock_g`, `exception_flag`, and `status_note` from weather/geopolitical events.

## Dataset 3 (warehouse_operations)

Populate from warehouse metrics (e.g. by aggregating shipments by `destination_site` and time, or from synthetic hourly/daily data). The CSV does not contain warehouse time-series; use app logic or synthetic data per the project suggestions doc.
