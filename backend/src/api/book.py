# from fastapi import APIRouter, Depends, HTTPException, Query
# from sqlalchemy.orm import Session
# from entities.entity_models import Book, User, get_db
# from schemas.book_schemas import BookCreate, BookResponse
# import datetime
# from pydantic import BaseModel
# # from services.auth import manager


# rt = APIRouter()



# @rt.post("/books", response_model=BookResponse)
# async def add_book(book: BookCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
#     """
#     Add a new booking for the authenticated user.
#     """
    
#     moscow_cutoff_time_utc = datetime.time(16, 0)  # 19:00 MSK = 16:00 UTC
    
#     try:
#         book_date = datetime.datetime.fromisoformat(book.book_date.rstrip("Z"))
#     except ValueError:
#         raise HTTPException(status_code=400, detail="Invalid date format")
    
    
#     now = datetime.datetime.now(datetime.timezone.utc)
    
    
#     if book_date.time() > moscow_cutoff_time_utc:
#         raise HTTPException(status_code=400, detail="Booking time cannot be after 19:00 MSK")


#     if book_date > now + datetime.timedelta(days=3):
#         raise HTTPException(status_code=400, detail="You can't book later than 3 days from now")
    
    
#     if book_date + datetime.timedelta(hours=1) < now:
#         raise HTTPException(status_code=400, detail="You cannot book a time that ends sooner than the current time")
    
#     if not (0 <= book.laundry_id <= 6):
#         raise HTTPException(status_code=400, detail="Invalid laundry ID")

#     busy_booking = db.query(Book).filter(
#         Book.laundry_id == book.laundry_id,                          # Same laundry
#         Book.book_date < book_date + datetime.timedelta(hours=1),    # Existing booking starts before the new booking finishes
#         Book.finished_at > book_date                                 # Existing booking ends after the new booking starts
#     ).first()

#     if busy_booking is not None:
#         raise HTTPException(status_code=400, detail="Time is already booked")
    
#     new_book = Book(
#         user_id=current_user.id, 
#         laundry_id=book.laundry_id,
#         book_date=book_date,
#         finished_at=book_date + datetime.timedelta(hours=1)
#     )

#     db.add(new_book)
#     db.commit()
#     db.refresh(new_book)
#     return BookResponse.from_orm(new_book)



# @rt.delete("/books/{bookId}", response_model=dict)
# async def remove_book(bookId: int, db: Session = Depends(get_db), current_user: User = Depends(manager)):
#     """
#     Remove a booking for the authenticated user.
#     """
#     book = db.query(Book).filter(Book.id == bookId).first()
    
#     if not book:
#         raise HTTPException(status_code=404, detail="Book not found")

#     if book.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="You are not authorized to delete this booking.")

#     db.delete(book)
#     db.commit()

#     return {"message": "Book removed successfully"}

# @rt.get("/books", response_model=list[BookResponse])
# async def get_books_by_day(day_offset: int = Query(0), db: Session = Depends(get_db), user: User = Depends(manager)):
#     """
#     Get books for a given day for the authenticated user.
#     The `day_offset` query parameter is the number of days from today (e.g., 0 for today, 1 for tomorrow).
#     """
#     if not user:
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

#     # Calculate the start and end of the requested day
#     start_of_day = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) + datetime.timedelta(days=day_offset)
#     end_of_day = start_of_day + datetime.timedelta(days=1)

#     books = db.query(Book).filter(
#         Book.user_id == user.id,
#         Book.book_date >= start_of_day,
#         Book.book_date < end_of_day
#     ).all()

#     if not books:
#         raise HTTPException(status_code=404, detail="No books found for the given day.")

#     return [BookResponse.from_orm(book) for book in books]