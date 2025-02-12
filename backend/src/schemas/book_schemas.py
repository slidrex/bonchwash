from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BookCreate(BaseModel):
    laundry_id: int
    book_date: Optional[datetime] = None

    class Config:
        from_attributes = True

class BookResponse(BaseModel):
    id: int  # Include the ID of the newly created book

    class Config:
        from_attributes = True  # Enable ORM mode to convert SQLAlchemy models to Pydantic models

class BookResponse(BaseModel):
    id: int
    user_id: int
    laundry_id: int
    book_date: datetime
    finished_at: datetime

    class Config:
        from_attributes = True