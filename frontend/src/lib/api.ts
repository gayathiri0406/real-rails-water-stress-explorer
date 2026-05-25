const API_BASE = "http://localhost:8000/api";

export async function fetchBasins() {
  const res = await fetch(`${API_BASE}/basins`);
  if (!res.ok) throw new Error("Failed to fetch basins");
  return res.json();
}

export async function fetchBasinsGeoJSON() {
  const res = await fetch(`${API_BASE}/basins/geojson`);
  if (!res.ok) throw new Error("Failed to fetch basin geojson");
  return res.json();
}

export async function fetchBasinDetail(id: string) {
  const res = await fetch(`${API_BASE}/basins/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch basin ${id}`);
  return res.json();
}

export async function fetchTrends() {
  const res = await fetch(`${API_BASE}/trends`);
  if (!res.ok) throw new Error("Failed to fetch trends");
  return res.json();
}
