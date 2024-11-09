from pydantic import BaseModel

class VKAuthRequest(BaseModel):
    access_token: str
    refresh_token: str
    vk_user_id: int

class VKAuthResponse(BaseModel):
    authorized: bool
    message: str
class VKExchangeRequest(BaseModel):
    code: str
    redirect_uri: str
    client_id: int
    device_id: str
    state: str

class VKInitResponse(BaseModel):
    code_challenge: str
    code_verifier: str
