from fastapi import APIRouter, HTTPException, HTTPException, Response, Cookie, Depends

from entities.entity_models import SessionLocal, User, Book

from schemas.user_schemas import UserCreate, UserResponse,ShortUserResponse
from schemas.book_schemas import BookCreate
from schemas.auth_schemas import AuthRequest, AuthResponse
import secrets
import requests
import hashlib
import base64

from entities.entity_models import get_db
from sqlalchemy.orm import Session
import requests
from typing import List

from fastapi import HTTPException, Response, Cookie, Depends
from datetime import datetime, timedelta
import jwt


SEVEN_DAYS = 7 * 24 * 60 * 60  # 604800 seconds

rt = APIRouter()

SECRET_KEY = "HALOBALOFAVOL@&!@$!^GDASDCVBNLMJRP_!"


class AuthRequest(BaseModel):
    room_id: str = Field(..., min_length=1, max_length=50)


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# Функция для создания JWT токена
def create_jwt_token(room_id: str, expires_delta: timedelta):
    expiration = datetime.now(timezone.utc) + expires_delta
    payload = {
        "sub": room_id,
        "exp": expiration,
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token


# Вспомогательная функция для проверки номера комнаты
def validate_room_id(room_id: str) -> bool:
    # Здесь можно добавить проверку в базе данных
    # Для примера, принимаем любой room_id длиной более 0
    return True  # Для всех номеров комнаты


# Обработчик маршрута авторизации
@rt.post("/auth", response_model=AuthResponse)
async def login(request: AuthRequest):
    if not validate_room_id(request.room_id):
        raise HTTPException(status_code=404, detail="Room ID not found")

    # Генерация токена
    token = create_jwt_token(request.room_id, SEVEN_DAYS)

    return AuthResponse(access_token=token)



