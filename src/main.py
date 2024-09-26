from fastapi import FastAPI
from api.auth import rt as auth_rt

app = FastAPI()
app.include_router(auth_rt)

@app.get("/test")
def test():
    return "Hello"