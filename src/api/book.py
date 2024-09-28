from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from entities.entity_models import Book, User, get_db
from schemas.book_schemas import BookCreate, BookResponse
from datetime import datetime

rt = APIRouter()

@rt.post("/add_book", response_model=BookResponse)
def add_book(book: BookCreate, db: Session = Depends(get_db)):
    
    user = db.query(User).filter(User.id == book.user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    busy_booking = db.query(Book).filter(
        Book.laundry_id == book.laundry_id,
        Book.finished_at == None,  # Only consider ongoing bookings
        Book.book_date < book.book_date + datetime.timedelta(hours=1),  # Start time of new booking should be before the end time of the existing booking
        (Book.book_date + datetime.timedelta(hours=1)) > book.book_date  # End time of the new booking should be after the start time of the existing booking
    ).first()
    if busy_booking != None:
        raise HTTPException(status_code=400, detail="Time is busy")
    # Create a new book entry
    new_book = Book(
        user_id=book.user_id,
        laundry_id=book.laundry_id,
        book_date=book.book_date,
        finished_at=book.book_date + datetime.timedelta(hours=1)
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return new_book

@rt.delete("/remove_book/{book_id}", response_model=dict)
def remove_book(book_id: int, db: Session = Depends(get_db)):
    # Check if the book exists
    book = db.query(Book).filter(Book.id == book_id).first()
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(book)
    db.commit()

    return {"message": "Book removed successfully"}

@rt.get("/get_books/{day}", response_model=dict)
def get_today_books(day:int, db: Session):
    # Get the start and end of today
    start_of_today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) + datetime.timedelta(days=day)
    end_of_today = start_of_today + datetime.timedelta(days=1)

    # Query to get all bookings for today
    today_books = db.query(Book).filter(
        Book.book_date >= start_of_today,
        Book.book_date < end_of_today
    ).all()

    return today_books