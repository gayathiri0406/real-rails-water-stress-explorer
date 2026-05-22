from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.adapters.mock_adapter import mock_adapter
from app.models.schemas import BasinMetric, BasinDetail

router = APIRouter()

@router.get("/", response_model=List[BasinMetric])
def get_basins():
    """Get a list of all basins with their high-level metrics."""
    basins = mock_adapter.get_all_basins()
    return basins

@router.get("/geojson", response_model=Dict[str, Any])
def get_basins_geojson():
    """Get GeoJSON feature collection for all basins."""
    return mock_adapter.get_all_geojson()

@router.get("/{basin_id}", response_model=BasinDetail)
def get_basin(basin_id: str):
    """Get detailed intelligence for a specific basin."""
    basin = mock_adapter.get_basin_by_id(basin_id)
    if not basin:
        raise HTTPException(status_code=404, detail="Basin not found")
    return basin
