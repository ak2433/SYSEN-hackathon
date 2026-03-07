# Supply Chain Portal — Presentation Overview

*A high-level guide for presenting the app*

---

## The Problem

Semiconductor supply chains are complex and fragile. Companies shipping chips from Asia to the US face:

- **Weather disruptions** — typhoons, storms, and extreme conditions that delay ports and flights
- **Geopolitical uncertainty** — trade tensions, regional conflicts, and policy changes
- **Operational risks** — port congestion, labor shortages, and chokepoint exposure (e.g., Taiwan Strait, South China Sea)

Without a single view of these factors, planners and logistics teams struggle to make informed decisions about *when* to ship, *which route* to use, and *what risks* to expect.

---

## Our Solution: Supply Chain Portal

**Supply Chain Portal** is a semiconductor supply chain intelligence platform that helps users:

1. **See the big picture** — current import/export conditions at a glance
2. **Plan smarter** — get route recommendations tailored to your shipment and priorities
3. **Track with confidence** — understand risk and expected arrival windows

---

## How It Works

### 1. Import/Export State

*"What do I need to know right now?"*

Users get a quick snapshot of the current environment:

- **Weather risk** by region (e.g., Taiwan, Malaysia, Singapore) — is severe weather expected?
- **Geopolitical headlines** — what’s happening in the news that could affect shipping?
- **Shipment metrics** — aggregate stats from historical data (delays, statuses, risk events)
- **AI summary** — a concise, actionable summary that ties it all together

**Value:** One place to understand the state of semiconductor importing and exporting before making decisions.

---

### 2. Plan Shipment

*"Which route should I use for this shipment?"*

Users enter shipment details (company, origin, destination, part type, priority) and receive:

- **Top route recommendations** — ranked by reliability, speed, cost, and risk
- **Transit times** — expected days in transit (with risk-adjusted estimates when conditions are rough)
- **Cost tiers** — economy, standard, or premium
- **Risk factors** — weather, geopolitics, port congestion, labor, chokepoint exposure
- **AI-generated plan** — a short operational plan with rationale and risks to monitor

**Value:** Data-driven route selection that balances speed, cost, and risk for your specific shipment.

---

### 3. Track Shipment

*"When will my shipment arrive, and what could delay it?"*

Users enter origin, destination, and (optionally) ship date to get:

- **Estimated arrival** — day range and calendar date
- **Risk factor (1–10)** — how likely delays are based on weather, geopolitics, historical delay rates, and recent events
- **Delay factors** — specific events (weather, geopolitical) that could affect this route
- **AI tracking summary** — a brief narrative with arrival expectations and risks

**Value:** Clear expectations and transparency about what might go wrong.

---

## Risk Intelligence

The app combines multiple risk signals:

| Factor | What it measures |
|--------|------------------|
| **Weather** | Forecast severity in the origin region |
| **Geopolitics** | Historical and current geopolitical risk scores |
| **Port congestion** | Congestion pressure from shipment data |
| **Labor** | Labor availability risk indicators |
| **Historical delays** | How often similar routes have been delayed |
| **Unprecedented events** | Rare events (hurricanes, typhoons, chokepoints) that could cause major disruption |

These are combined into a **composite risk score** for planning and a **risk factor (1–10)** for tracking.

---

## Who It’s For

- **Supply chain / logistics managers** — planning and monitoring semiconductor shipments
- **Procurement teams** — understanding lead times and risk before ordering
- **Executives** — getting a quick overview of import/export conditions

---

## Tech at a Glance

- **Frontend:** React + Vite — modern, fast web app
- **Backend:** FastAPI — Python API with route scoring, risk logic, and AI integration
- **Data:** Weather APIs, news feeds, and shipment history (Supabase / CSV)
- **AI:** OpenAI GPT-4o for summaries, plans, and tracking narratives

---

## Key Takeaways

1. **Single view** — Weather, news, and shipment data in one place
2. **Route-aware** — Recommendations consider your specific origin, destination, part type, and priority
3. **Risk-transparent** — Clear risk scores and factors so you know what to watch
4. **AI-assisted** — Natural-language summaries and plans instead of raw data dumps

---

*Built for the SYSEN Hackathon*
