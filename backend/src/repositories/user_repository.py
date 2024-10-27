from sqlalchemy.orm import Session
from entities.entity_models import User
from schemas.user_schemas import ShortUserResponse

class UserRepository:

    @staticmethod
    def get_user_by_id(session: Session, user_id: int) -> User:
        """Retrieve a user by ID."""
        return session.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_all_users(session: Session):
        """Retrieve all users."""
        return session.query(User).all()

    @staticmethod
    def delete_user(session: Session, user: User):
        """Delete a user."""
        session.delete(user)
        session.commit()

    @staticmethod
    def ban_user(session: Session, user: User):
        """Ban a user."""
        user.is_blocked = True
        session.commit()
        return ShortUserResponse(id=user.id, is_blocked=True)

    @staticmethod
    def unban_user(session: Session, user: User):
        """Unban a user."""
        user.is_blocked = False
        session.commit()
        return ShortUserResponse(id=user.id, is_blocked=False)
