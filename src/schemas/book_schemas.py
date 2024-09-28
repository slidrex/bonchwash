from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BookCreate(BaseModel):
    user_id: int
    laundry_id: int
    book_date: Optional[datetime] = None

    class Config:
        orm_mode = True 

class BookResponse(BaseModel):
    id: int  # Include the ID of the newly created book

    class Config:
        orm_mode = True  # Enable ORM mode to convert SQLAlchemy models to Pydantic models