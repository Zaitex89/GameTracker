# Game Tracker
# Alex Brandt

## About
A fullstack fantasy-themed game tracking application. Keep track of your games, platforms, genres, status and ratings.

## Start backend
```bash
cd backend
```

Create a virtual environment and activate it:
```bash
# On Windows
python -m venv .venv
.venv\Scripts\activate

# On macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:
```bash
DATABASE_URL=postgresql://username:password@localhost/games
```

Start the server:
```bash
uvicorn app:app --reload
```

API will be running at `http://127.0.0.1:8000`
Interactive docs available at `http://127.0.0.1:8000/docs`

## Start frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will be running at `http://localhost:5173`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /games | Get all games |
| GET | /games/{id} | Get a single game |
| POST | /games | Create a new game |
| PUT | /games/{id} | Update a game |
| DELETE | /games/{id} | Delete a game |

## Tech Stack
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL, Pydantic
- **Frontend:** React, TypeScript, Vite