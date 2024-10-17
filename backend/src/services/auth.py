from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from entities.entity_models import User
from entities.entity_models import get_db
from sqlalchemy.orm import Session
import time
import os
from dotenv import load_dotenv

from fastapi_login import LoginManager

# Load environment variables from .env file
load_dotenv()

# Now you can access the environment variables
SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret")  # Fallback value in case it's not found
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# OAuth2 scheme for authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/login")

SECRET = 'SECRET'
manager = LoginManager(SECRET, tokenUrl='/login')


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         room_id: str = payload.get("room")
#         user_id: str = payload.get("user_id")
#         exp = payload.get("exp")
#         if room_id is None or user_id is None:
#             raise credentials_exception
#         if exp is None or time.time() > exp:
#             raise credentials_exception  # Token has expired or exp is missing
    
#     except JWTError:
#         raise credentials_exception
    
#     user = db.query(User).filter(User.id == int(user_id)).first()
#     if user is None:
#         raise credentials_exception
#     return user
