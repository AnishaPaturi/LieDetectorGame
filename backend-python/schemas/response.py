from pydantic import BaseModel, Field
from typing import List

class TimelineEntry(BaseModel):
    time: float = Field(..., description="Timestamp in seconds since video start")
    truth_score: float = Field(..., ge=0.0, le=1.0, description="Probability of truthfulness (0 = lie, 1 = truth)")

class AnalysisResponse(BaseModel):
    timeline: List[TimelineEntry] = Field(..., description="List of deception scores over time")
