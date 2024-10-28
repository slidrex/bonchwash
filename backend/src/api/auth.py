from fastapi import APIRouter, HTTPException, HTTPException, Response, Cookie, Depends

from entities.entity_models import SessionLocal, User, Book

from schemas.user_schemas import UserCreate, UserResponse,ShortUserResponse
from schemas.book_schemas import BookCreate
from schemas.auth_schemas import VKAuthRequest

from entities.entity_models import get_db
from sqlalchemy.orm import Session

from typing import List

SEVEN_DAYS = 7 * 24 * 60 * 60  # 604800 seconds

rt = APIRouter()

# @rt.post("/api/v1/user", response_model=UserResponse)  # Use UserResponse as the response model
# def register_user(usr: UserCreate):
#     user = User(**usr.model_dump())
#     session: Session = SessionLocal()
#     try:
#         session.add(user)
#         session.commit()
#         session.refresh(user)  # Refresh to get the ID after insert
#         return UserResponse(id=user.id, is_blocked=False, first_name=usr.first_name, second_name=usr.second_name, room_id=usr.room_id) # This will be serialized using UserResponse
#     except Exception as e:
#         session.rollback()
#         raise HTTPException(status_code=400, detail=str(e))
#     finally:
#         session.close()

# from fastapi import FastAPI, Depends, HTTPException
# from pydantic import BaseModel


# class LoginForm(BaseModel):
#     surname: str
#     room_id:int

# class VKLoginForm(BaseModel):
#     vk_token: str


# @rt.post("/api/v1/login", response_model=dict)
# async def login(form_data: LoginForm, db: Session = Depends(get_db), access_token: str):
#     # get access_token from frontend
#     # get user info by vk api and return jwt


#     # user = db.query(User).filter(User.second_name == form_data.surname).filter(User.room_id == form_data.room_id).first()
    
#     # if not user:
#     #     raise HTTPException(status_code=400, detail="Invalid credentials")
    
#     # jwt
#     access_token = manager.create_access_token(data={"room": user.room_id, "user_id" : user.id})
#     return {"access_token": access_token}

from fastapi import FastAPI, HTTPException, Response, Cookie, Depends

from datetime import datetime, timedelta
import jwt

SECRET_KEY = "HALOBALOFAVOL@&!@$!^GDASDCVBNLMJRP_!"

# JWT
def create_jwt_token(vk_user_id: str, expires_delta: timedelta):
    expiration = datetime.utcnow() + expires_delta
    token = jwt.encode({"sub": vk_user_id, "exp": expiration}, SECRET_KEY, algorithm="HS256")
    return token

@rt.post("/auth")
async def vk_auth(data: VKAuthRequest, response: Response):
    # if user not exists - create in db
    # else exists

    vk_user_id = data.vk_user_id  # Эмулируем получение ID пользователя
    
    # Создаем access и refresh токены
    access_token = create_jwt_token(vk_user_id, timedelta(minutes=15))
    refresh_token = create_jwt_token(vk_user_id, timedelta(days=7))

    # Устанавливаем токены в куки
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
    
    return response

# Эндпоинт для проверки авторизации
@rt.get("/auth")
async def check_auth(access_token: str = Cookie(None), refresh_token: str = Cookie(None), response: Response = None):
    if not access_token:
        # Если access_token отсутствует, отправляем ответ неавторизованного пользователя
        raise HTTPException(status_code=401, detail="Unathorized")

    try:
        # Проверяем access_token
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=["HS256"])
        return {"authorized": True}
    except jwt.ExpiredSignatureError:
        if refresh_token:
            try:
                # Проверка и обновление access_token через refresh_token
                payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=["HS256"])
                vk_user_id = payload.get("sub")
                new_access_token = create_jwt_token(vk_user_id, timedelta(days=7))
                # Устанавливаем новый access_token в куку
                response.set_cookie(key="access_token", value=new_access_token, httponly=True, secure=True, samesite="Strict", max_age=SEVEN_DAYS)
                return {"authorized": True}
            except jwt.ExpiredSignatureError:
                # Если refresh_token тоже истек, требуем авторизации
                raise HTTPException(status_code=401, detail="Требуется повторная авторизация")
        else:
            raise HTTPException(status_code=401, detail="Требуется повторная авторизация")



