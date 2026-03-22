# Schemas — Describes how the data looks like when it's being transfered in and out of the API
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class GameCreate(BaseModel):
    title: str
    platform: str
    genre: str
    status: str
    rating: Optional[int] = None


class GameUpdate(BaseModel):
    title: Optional[str] = None
    platform: Optional[str] = None
    genre: Optional[str] = None
    status: Optional[str] = None
    rating: Optional[int] = None

class GameResponse(GameCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True