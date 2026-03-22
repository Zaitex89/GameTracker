from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from models.game import Game
from schemas.game import GameCreate, GameUpdate, GameResponse 


router = APIRouter(
    prefix="/games",
    tags=["games"]
)


@router.get("/", response_model=list[GameResponse])
async def get_all_games(db: Session = Depends(get_db)):
    games = db.query(Game).all()
    print(f"Fetched {len(games)} games from database")
    return games


@router.get("/{game_id}", response_model=GameResponse)
async def get_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()

    if not game:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Game with ID: {game_id} not found")
    print(f"Fetched game with ID: {game_id}")
    return game


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=GameResponse)
async def create_game(game: GameCreate, db: Session = Depends(get_db)):
    existing_game = db.query(Game).filter(Game.title == game.title).first()
    if existing_game:
        print(f"Failed, game with title: {game.title} already exists")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"A game with title '{game.title}' already exists")
    
    new_game = Game(
        title=game.title,
        platform=game.platform,
        genre=game.genre,
        status=game.status,
        rating=game.rating
    )

    db.add(new_game)
    db.commit()
    db.refresh(new_game)

    return new_game


@router.put("/{game_id}", response_model=GameUpdate)
async def update_game(game_id: int, game_update: GameUpdate, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        print(f"Game with ID: {game_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Game with ID: {game_id} not found")
    
    if game_update.title:
        existing_title = db.query(Game).filter(
            Game.title == game_update.title,
            Game.id != game_id
        ).first()
        if existing_title:
            print(f"Attempted update to existing title: {game_update.title}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"A game with title '{game_update.title}' already exists")
        
        game.title = game_update.title  # type: ignore

    if game_update.platform:
        game.platform = game_update.platform  # type: ignore

    if game_update.genre:
        game.genre = game_update.genre  # type: ignore

    if game_update.status:
        game.status = game_update.status  # type: ignore

    if game_update.rating:
        game.rating = game_update.rating  # type: ignore


    db.commit()
    db.refresh(game)

    return game


@router.delete("/{game_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_game(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        print(f"Game with ID {game_id} not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Game with ID: {game_id} not found")
    
    db.delete(game)
    db.commit()

    return None