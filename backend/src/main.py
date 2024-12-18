from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.auth import rt as auth_rt
# from api.book import rt as book_rt
# from api.personal import rt as personal_rt
# from api.admin import rt as admin_rt
from entities.entity_models import create_tables

app = FastAPI()
app.include_router(auth_rt, prefix='/api/v1')
# app.include_router(book_rt, prefix='/v1')
# app.include_router(personal_rt, prefix='/v1')
# app.include_router(admin_rt)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.delete("/db/reset")
def recreate_db():
    create_tables()  # Optionally recreate the database
    return {"message": "database_recreated"}

@app.get("tesend")
def testend():
    return {"message" : "useful text"}