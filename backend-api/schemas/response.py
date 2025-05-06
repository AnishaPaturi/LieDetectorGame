from pydantic import BaseModel
from typing import List

class TimelineEntry(BaseModel):
    time: float  # seconds
    truth_score: float  # 0.0 to 1.0

class AnalysisResponse(BaseModel):
    timeline: List[TimelineEntry]
