from pydantic import BaseModel

class VKAuthRequest(BaseModel):
    access_token: str
    refresh_token: str
    vk_user_id: str