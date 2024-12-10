from pydantic import BaseModel

class AuthRequest(BaseModel):
    room_id: str = Field(..., min_length=1, max_length=50)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"