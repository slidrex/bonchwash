from pydantic import BaseModel

class UserCreate(BaseModel):
    first_name: str
    second_name: str
    room_id: int

    class Config:
        from_attributes = True

class UserResponse(UserCreate):
    id: int
    is_blocked: bool
    pass
    
class ShortUserResponse(BaseModel):
    id: int
    is_blocked: bool