from fastapi import FastAPI
from api.auth import rt as auth_rt
from api.book import rt as book_rt
from api.personal import rt as personal_rt
from api.admin import rt as admin_rt
from entities.entity_models import create_tables

app = FastAPI()
app.include_router(auth_rt)
app.include_router(book_rt, prefix='/v1')
app.include_router(personal_rt, prefix='/v1')
app.include_router(admin_rt)

@app.delete("/db/reset")
def recreate_db():
    create_tables()  # Optionally recreate the database
    return {"message": "database_recreated"}
