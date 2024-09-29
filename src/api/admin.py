
from fastapi import APIRouter, HTTPException
from entities.entity_models import SessionLocal, User, Book
from schemas.user_schemas import UserCreate, UserResponse,ShortUserResponse
from schemas.book_schemas import BookCreate
from sqlalchemy.orm import Session
from typing import List
rt = APIRouter()

#@rt.delete("/user/{userId}")
def remove_user(userId: int):
    session: Session = SessionLocal()
    user = session.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    session.delete(user)
    session.commit()
    return {"message": "User deleted"}

#@rt.get("/user/{userId}")
def get_user(userId:int):
    session: Session = SessionLocal()
    user = session.query(User).filter(User.id == userId).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(id=user.id, is_blocked=user.is_blocked, first_name=user.first_name, second_name=user.second_name, room_id=user.id)

@rt.get("/users", response_model=List[UserResponse])
def get_users():
    with SessionLocal() as session:
        user = session.query(User).all()
        return user

#@rt.put("/ban-user/{userId}")
def ban_user(userId: int):
    session: Session = SessionLocal()
    user = session.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_blocked:
        raise HTTPException(status_code=400, detail="User already banned")
    user.is_blocked = True
    session.commit()
    return ShortUserResponse(id=userId, is_blocked=True)

#@rt.put("/unban-user/{userId}")
def unban_user(userId: int):
    session: Session = SessionLocal()
    user = session.query(User).filter(User.id == userId).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if user.is_blocked == False:
        raise HTTPException(status_code=400, detail="User not banned")
    user.is_blocked = False
    session.commit()
    return ShortUserResponse(id=userId, is_blocked=False)