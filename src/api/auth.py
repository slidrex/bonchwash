from fastapi import APIRouter, HTTPException
from entities.entity_models import SessionLocal, User, Book
from schemas.user_schemas import UserCreate, UserResponse
from sqlalchemy.orm import Session

rt = APIRouter()

@rt.post("/add_user", response_model=UserResponse)  # Use UserResponse as the response model
def register_user(usr: UserCreate):
    user = User(**usr.model_dump())
    session: Session = SessionLocal()
    try:
        session.add(user)
        session.commit()
        session.refresh(user)  # Refresh to get the ID after insert
        return UserResponse(id=user.id, is_blocked=False) # This will be serialized using UserResponse
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        session.close()

@rt.delete("/remove_user/{user_id}")
def remove_user(user_id: int):
    session: Session = SessionLocal()
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    session.delete(user)
    session.commit()
    return {"message": "User deleted"}

@rt.patch("/ban_user/{user_id}")
def ban_user(user_id: int):
    session: Session = SessionLocal()
    user = session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_blocked = True
    session.commit()
    return {"message": "User banned"}
