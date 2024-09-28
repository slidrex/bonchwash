from fastapi import FastAPI
from api.auth import rt as auth_rt
from entities.entity_models import create_tables

app = FastAPI()
app.include_router(auth_rt)


@app.delete("/recreate_db")
def recreate_db():
    create_tables()  # Optionally recreate the database
    return {"message": "database_recreated"}
