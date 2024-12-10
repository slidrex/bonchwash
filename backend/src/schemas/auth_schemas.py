from pydantic import BaseModel

class AuthRequest(BaseModel):
    access_token: str
    refresh_token: str
    vk_user_id: int

class AuthResponse(BaseModel):
    token: str
