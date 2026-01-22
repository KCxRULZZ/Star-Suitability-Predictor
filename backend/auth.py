from fastapi import APIRouter, HTTPException
from database import get_db
import bcrypt
import jwt
from datetime import datetime, timedelta

SECRET = "supersecretkey"
router = APIRouter(prefix="/auth")

@router.post("/signup")
def signup(username: str, password: str):
    db = get_db()
    users = db.users
    if users.find_one({"username": username}):
        raise HTTPException(status_code=400, detail="Username already exists.")
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users.insert_one({"username": username, "password": hashed})
    return {"message": "Signup successful."}

@router.post("/login")
def login(username: str, password: str):
    db = get_db()
    user = db.users.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=400, detail="User not found.")
    if not bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        raise HTTPException(status_code=400, detail="Invalid password.")
    token = jwt.encode(
        {"username": username, "exp": datetime.utcnow() + timedelta(hours=12)},
        SECRET,
        algorithm="HS256"
    )
    return {"token": token}
