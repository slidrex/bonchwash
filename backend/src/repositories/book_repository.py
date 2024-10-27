from sqlalchemy.orm import Session
from entities.entity_models import Book
import datetime
from typing import Optional, List

class BookRepository:

    @staticmethod
    def is_time_slot_busy(session: Session, laundry_id: int, book_date: datetime.datetime) -> bool:
        """
        Check if the given time slot is already booked.
        """
        busy_booking = session.query(Book).filter(
            Book.laundry_id == laundry_id,
            Book.book_date < book_date + datetime.timedelta(hours=1),
            Book.finished_at > book_date
        ).first()
        return busy_booking is not None

    @staticmethod
    def create_booking(session: Session, user_id: int, laundry_id: int, book_date: datetime.datetime) -> Book:
        """
        Create a new booking.
        """
        new_book = Book(
            user_id=user_id,
            laundry_id=laundry_id,
            book_date=book_date,
            finished_at=book_date + datetime.timedelta(hours=1)
        )
        session.add(new_book)
        session.commit()
        session.refresh(new_book)
        return new_book

    @staticmethod
    def get_booking_by_id(session: Session, book_id: int) -> Optional[Book]:
        """
        Retrieve a booking by its ID.
        """
        return session.query(Book).filter(Book.id == book_id).first()

    @staticmethod
    def delete_booking(session: Session, book: Book):
        """
        Delete a booking.
        """
        session.delete(book)
        session.commit()

    @staticmethod
    def get_bookings_by_day(session: Session, user_id: int, start_of_day: datetime.datetime, end_of_day: datetime.datetime) -> List[Book]:
        """
        Retrieve bookings for a user on a specific day.
        """
        return session.query(Book).filter(
            Book.user_id == user_id,
            Book.book_date >= start_of_day,
            Book.book_date < end_of_day
        ).all()
