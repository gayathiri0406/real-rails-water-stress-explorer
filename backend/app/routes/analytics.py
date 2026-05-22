from fastapi import APIRouter
from typing import List, Dict, Any
from app.adapters.mock_adapter import mock_adapter

router = APIRouter()

@router.get("/trends", response_model=Dict[str, Any])
def get_aggregated_trends():
    """Get aggregated trends across all basins."""
    basins = mock_adapter.get_all_basins()
    if not basins:
        return {}
    
    # Aggregate data simply by averaging stress across years
    yearly_data = {}
    for basin in basins:
        for trend in basin.get("trends", []):
            year = trend["year"]
            if year not in yearly_data:
                yearly_data[year] = {"stress_sum": 0, "pop_sum": 0, "count": 0}
            yearly_data[year]["stress_sum"] += trend["stress_level"]
            yearly_data[year]["pop_sum"] += trend["population_exposure"]
            yearly_data[year]["count"] += 1
            
    aggregated_trends = []
    for year in sorted(yearly_data.keys()):
        data = yearly_data[year]
        aggregated_trends.append({
            "year": year,
            "average_stress_level": round(data["stress_sum"] / data["count"], 2),
            "total_population_exposure": data["pop_sum"]
        })
        
    return {"trends": aggregated_trends}

@router.get("/compare", response_model=Dict[str, Any])
def compare_basins(ids: str):
    """Compare multiple basins by comma-separated IDs."""
    basin_ids = ids.split(",")
    results = []
    for bid in basin_ids:
        basin = mock_adapter.get_basin_by_id(bid.strip())
        if basin:
            results.append({
                "id": basin["id"],
                "name": basin["name"],
                "water_stress_score": basin["water_stress_score"],
                "population_exposure": basin["population_exposure"],
                "risk_level": basin["risk_level"]
            })
    return {"comparison": results}
