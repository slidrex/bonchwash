from fastapi import APIRouter, HTTPException
from entities.entity_models import SessionLocal, User, Book
from schemas.user_schemas import UserCreate, UserResponse,ShortUserResponse
from schemas.book_schemas import BookCreate
from sqlalchemy.orm import Session
from entities.entity_models import get_db
from services.auth import get_current_user
from fastapi import Depends
from typing import List
rt = APIRouter()

@rt.get("/profile", response_model=UserResponse)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


@rt.delete("/profile", status_code=204)
async def delete_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Delete the authenticated user's profile.
    """
    # Query the current user in the database
    user_to_delete = db.query(User).filter(User.id == current_user.id).first()

    if user_to_delete is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Delete the user from the database
    db.delete(user_to_delete)
    db.commit()

    return {"message": "Profile successfully deleted"}