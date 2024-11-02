from fastapi import APIRouter, HTTPException, HTTPException, Response, Cookie, Depends

from entities.entity_models import SessionLocal, User, Book

from schemas.user_schemas import UserCreate, UserResponse,ShortUserResponse
from schemas.book_schemas import BookCreate
from schemas.auth_schemas import VKAuthRequest, VKAuthResponse

from entities.entity_models import get_db
from sqlalchemy.orm import Session

from typing import List

from fastapi import HTTPException, Response, Cookie, Depends
from datetime import datetime, timedelta
import jwt

import httpx

SEVEN_DAYS = 7 * 24 * 60 * 60  # 604800 seconds

rt = APIRouter()

SECRET_KEY = "HALOBALOFAVOL@&!@$!^GDASDCVBNLMJRP_!"

def create_jwt_token(vk_user_id: str, expires_delta: timedelta):
    expiration = datetime.now(datetime.timezone.utc) + expires_delta
    token = jwt.encode({"sub": vk_user_id, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    return token

# async def check_auth(access_token: str = Cookie(None), refresh_token: str = Cookie(None), response: Response = None):
#     if not access_token:
#         # Если access_token отсутствует, отправляем ответ неавторизованного пользователя
#         raise HTTPException(status_code=401, detail="Unathorized")

#     try:
#         # Проверяем access_token
#         payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
#         return {"authorized": True}
#     except jwt.ExpiredSignatureError:
#         if refresh_token:
#             try:
#                 # Проверка и обновление access_token через refresh_token
#                 payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=["HS256"])
#                 vk_user_id = payload.get("sub")
#                 new_access_token = create_jwt_token(vk_user_id, timedelta(days=7))
#                 # Устанавливаем новый access_token в куку
#                 response.set_cookie(key="access_token", value=new_access_token, httponly=True, secure=True, samesite="Strict", max_age=SEVEN_DAYS)
#                 return {"authorized": True}
#             except jwt.ExpiredSignatureError:
#                 # Если refresh_token тоже истек, требуем авторизации
#                 raise HTTPException(status_code=401, detail="Требуется повторная авторизация")
#         else:
#             raise HTTPException(status_code=401, detail="Требуется повторная авторизация")

async def validate_vk_token(access_token: str, user_id: int):
    vk_api_url = "https://api.vk.com/method/users.get"
    params = {
        "access_token": access_token,
        "user_ids": user_id,
        "v": "5.131"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(vk_api_url, params=params)
        data = response.json()

        if "error" in data:
            raise HTTPException(
                status_code=401, detail="Invalid VK access token or user_id"
            )
        return data["response"][0]["id"] == user_id

@rt.post("/auth", response_model=VKAuthResponse)
async def validate_token(request: VKAuthRequest, response: Response):
    is_valid = await validate_vk_token(request.access_token, request.vk_user_id)

    if is_valid:
        access_token = create_jwt_token(request.vk_user_id, timedelta(days=7))
        refresh_token = create_jwt_token(request.vk_user_id, timedelta(days=7))

        response.set_cookie(
            key="access_token", 
            value=access_token, 
            httponly=True, 
            secure=True, 
            samesite="Strict", 
            max_age=SEVEN_DAYS)
        response.set_cookie(
            key="refresh_token", 
            value=refresh_token, 
            httponly=True, 
            secure=True, 
            samesite="Strict", 
            max_age=SEVEN_DAYS)

        return VKAuthResponse(authorized=True, message="User authorized successfully")
    else:
        raise HTTPException(status_code=401, detail="Invalid token or user ID")

