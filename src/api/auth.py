from fastapi import APIRouter, HTTPException
from entities.entity_models import SessionLocal, User, Book
from schemas.user_schemas import UserCreate, UserResponse,ShortUserResponse
from schemas.book_schemas import BookCreate
from entities.entity_models import get_db
from sqlalchemy.orm import Session
from services.auth import create_access_token
from typing import List
rt = APIRouter()

@rt.post("/v1/user", response_model=UserResponse)  # Use UserResponse as the response model
def register_user(usr: UserCreate):
    user = User(**usr.model_dump())
    session: Session = SessionLocal()
    try:
        session.add(user)
        session.commit()
        session.refresh(user)  # Refresh to get the ID after insert
        return UserResponse(id=user.id, is_blocked=False, first_name=usr.first_name, second_name=usr.second_name, room_id=usr.room_id) # This will be serialized using UserResponse
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        session.close()

from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel


class LoginForm(BaseModel):
    surname: str
    room_id:int

class VKLoginForm(BaseModel):
    vk_token: str


@rt.post("/v1/login", response_model=dict)
async def login(form_data: LoginForm, db: Session = Depends(get_db)):
    
    user = db.query(User).filter(User.second_name == form_data.surname).filter(User.room_id == form_data.room_id).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"room": user.room_id, "user_id" : user.id})
    return {"access_token": access_token, "token_type": "bearer"}
'''

@rt.post("/v1/login/vk", response_model=dict)
async def vk_login(form_data: VKLoginForm, db: Session = Depends(get_db)):
    # Validate VK token
    if not validate_vk_token(form_data.vk_token):
        raise HTTPException(status_code=401, detail="Invalid VK token")
    
    # Optionally, find or create the user in your system based on VK data
    
    # Create JWT token after successful VK token validation
    access_token = create_access_token(data={"sub": "vk_user_id"})  # Use actual VK user ID or email
    return {"access_token": access_token, "token_type": "bearer"}

'''
