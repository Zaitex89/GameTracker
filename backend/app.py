from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.games import router as games_router
from config.database import Base, engine
from models.game import Game

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(games_router)