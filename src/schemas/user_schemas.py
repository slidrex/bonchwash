from pydantic import BaseModel

class UserCreate(BaseModel):
    first_name: str
    second_name: str
    room_id: int

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    id: int
    is_blocked: bool

    class Config:
        orm_mode = True