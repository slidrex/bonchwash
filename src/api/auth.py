from fastapi import APIRouter

rt = APIRouter()

@rt.get("/test1")
def test():
    return "He1llo"