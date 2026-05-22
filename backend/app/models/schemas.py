from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class BasinMetric(BaseModel):
    id: str
    name: str
    water_stress_score: float
    population_exposure: int
    agricultural_dependency: float
    industrial_concentration: float
    risk_level: str

class TrendDataPoint(BaseModel):
    year: int
    stress_level: float
    population_exposure: int

class BasinDetail(BasinMetric):
    trends: List[TrendDataPoint]
    insights: List[str]
    geo_json: Dict[str, Any]
