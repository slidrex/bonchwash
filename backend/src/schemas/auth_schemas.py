from pydantic import BaseModel

class VKAuthRequest(BaseModel):
    access_token: str
    refresh_token: str
    vk_user_id: int

class VKAuthResponse(BaseModel):
    authorized: bool
    message: str
class VKExchangeRequest(BaseModel):
    device_id:str
    code: str