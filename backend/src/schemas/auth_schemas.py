from pydantic import BaseModel

class VKAuthRequest(BaseModel):
    access_token: str
    refresh_token: str
    vk_user_id: int

class VKAuthResponse(BaseModel):
    authorized: bool
    message: str
class VKExchangeRequest(BaseModel):
    silent_token: str
    redirect_uri: str
    client_id: int

class VKInitResponse(BaseModel):
    code_challenge: str
    code_verifier: str
