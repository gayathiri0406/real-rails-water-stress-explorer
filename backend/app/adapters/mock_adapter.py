import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional

MOCK_FILE_PATH = Path(__file__).parent.parent / "mock" / "mock_data.json"

class MockDataAdapter:
    def __init__(self):
        self.data = self._load_data()

    def _load_data(self) -> Dict[str, Any]:
        if not os.path.exists(MOCK_FILE_PATH):
            return {"basins": []}
        with open(MOCK_FILE_PATH, "r") as f:
            return json.load(f)

    def get_all_basins(self) -> List[Dict[str, Any]]:
        return self.data.get("basins", [])

    def get_basin_by_id(self, basin_id: str) -> Optional[Dict[str, Any]]:
        basins = self.get_all_basins()
        for basin in basins:
            if basin["id"] == basin_id:
                return basin
        return None

    def get_all_geojson(self) -> Dict[str, Any]:
        basins = self.get_all_basins()
        features = [basin["geo_json"] for basin in basins]
        return {
            "type": "FeatureCollection",
            "features": features
        }

mock_adapter = MockDataAdapter()
