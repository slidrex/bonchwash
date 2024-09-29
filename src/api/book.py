from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from entities.entity_models import Book, User, get_db
from schemas.book_schemas import BookCreate, BookResponse
from datetime import timedelta
import datetime
from pydantic import BaseModel
from services.auth import get_current_user

rt = APIRouter()




@rt.post("/books", response_model=BookResponse)
async def add_book(book: BookCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Add a new booking for the authenticated user.
    """
    busy_booking = db.query(Book).filter(
        Book.laundry_id == book.laundry_id,
        Book.finished_at == None,  # Only consider ongoing bookings
        Book.book_date < book.book_date + timedelta(hours=1),  # Start time of new booking should be before the end time of the existing booking
        (Book.book_date + timedelta(hours=1)) > book.book_date  # End time of the new booking should be after the start time of the existing booking
    ).first()

    if busy_booking is not None:
        raise HTTPException(status_code=400, detail="Time is busy")
    
    
    new_book = Book(
        user_id=current_user.id, 
        laundry_id=book.laundry_id,
        book_date=book.book_date,
        finished_at=book.book_date + timedelta(hours=1)
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return BookResponse.from_orm(new_book)



@rt.delete("/books/{bookId}", response_model=dict)
async def remove_book(bookId: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Remove a booking for the authenticated user.
    """
    book = db.query(Book).filter(Book.id == bookId).first()
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="You are not authorized to delete this booking.")

    db.delete(book)
    db.commit()

    return {"message": "Book removed successfully"}
@rt.get("/books", response_model=list[BookResponse])
async def get_books_by_day(day_offset: int = Query(0), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """
    Get books for a given day for the authenticated user.
    The `day_offset` query parameter is the number of days from today (e.g., 0 for today, 1 for tomorrow).
    """
    # Calculate the start and end of the requested day
    start_of_day = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=day_offset)
    end_of_day = start_of_day + datetime.timedelta(days=1)

    books = db.query(Book).filter(
        Book.user_id == current_user.id,
        Book.book_date >= start_of_day,
        Book.book_date < end_of_day
    ).all()

    if not books:
        raise HTTPException(status_code=404, detail="No books found for the given day.")

    # Convert each book to the Pydantic response model
    return [BookResponse.from_orm(book) for book in books]