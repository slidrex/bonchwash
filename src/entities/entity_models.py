from pydantic import BaseModel
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker, declarative_base
from repositories.manage_repository import get_db_path

# SQLAlchemy base class
Base = declarative_base()

# SQLAlchemy engine and session
engine = create_engine(f"sqlite:///{get_db_path()}", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Book Model
class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    laundry_id = Column(Integer, nullable=False)
    book_date = Column(DateTime, default=datetime.utcnow)
    finished_at = Column(DateTime, default=None)

    user = relationship("User", back_populates="bookings")

# User Model
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    second_name = Column(String)
    room_id = Column(Integer)
    is_blocked = Column(Boolean, default=False)

    bookings = relationship("Book", back_populates="user")

def create_tables():
    Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()