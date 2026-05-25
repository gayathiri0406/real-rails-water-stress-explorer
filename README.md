# 🌊 Water Stress Basin Explorer

**Institutional-grade geospatial intelligence dashboard for analyzing global water stress, basin resilience, and population exposure.**

Built with **Next.js 16**, **FastAPI**, **TypeScript**, **Leaflet**, and **Recharts** — part of the **Real Rails Intelligence Library**.

---

## ✨ Features

- 🗺️ **Interactive Basin Map** — Dark-themed Leaflet map with GeoJSON overlays, color-coded by risk level
- 📊 **Comparative Analytics** — Select up to 3 basins for side-by-side metric comparison
- 📈 **Trend Visualization** — Historical water stress trends (2019–2023) with Recharts
- 🎯 **Dynamic Filtering** — Filter basins by risk level (Critical, Extreme, Moderate, Low)
- 🔍 **Basin Intelligence** — Detailed metrics: water stress score, population exposure, agricultural dependency, industrial concentration
- 📥 **Data Export** — Download basin intelligence data
- 🌙 **Dark Mode UI** — Premium dark theme with glassmorphism and micro-animations

## 🏗️ Architecture

```
├── backend/                    # FastAPI (Python)
│   ├── app/
│   │   ├── main.py             # App entry + CORS + routing
│   │   ├── routes/
│   │   │   ├── basins.py       # Basin CRUD endpoints
│   │   │   └── analytics.py    # Trends & comparison endpoints
│   │   ├── models/schemas.py   # Pydantic models
│   │   ├── adapters/           # Data adapters (mock/live)
│   │   └── mock/               # Mock data (GeoJSON + metrics)
│   └── requirements.txt
│
└── frontend/                   # Next.js 16 + TypeScript
    ├── src/
    │   ├── app/                # Pages & layout
    │   ├── components/         # Map, Sidebar, Charts
    │   └── lib/                # API client & utilities
    ├── package.json
    └── tsconfig.json
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at **http://localhost:8000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Service health check |
| `/api/basins` | GET | List all basins with metrics |
| `/api/basins/geojson` | GET | GeoJSON FeatureCollection |
| `/api/basins/{id}` | GET | Detailed basin intelligence |
| `/api/trends` | GET | Aggregated historical trends |
| `/api/compare?ids=` | GET | Multi-basin comparison |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 16 (Turbopack) |
| Language | TypeScript 5 |
| UI Components | React 19 |
| Mapping | Leaflet + React-Leaflet |
| Charts | Recharts |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Backend Framework | FastAPI |
| Data Validation | Pydantic |
| Server | Uvicorn |

## 📊 Basin Data

The explorer currently includes intelligence data for:

| Basin | Region | Risk Level |
|-------|--------|-----------|
| Colorado River Basin | North America | Critical |
| Nile River Basin | Africa | Extreme |
| Rhine River Basin | Europe | Moderate |

## 📄 License

This project is part of the **Real Rails Intelligence Library** — an institutional-grade analytics platform for geospatial and infrastructure intelligence.

---

<p align="center">
  <strong>Real Rails</strong> · Intelligence Library<br/>
  <em>Water Stress Basin Explorer v1.0</em>
</p>
