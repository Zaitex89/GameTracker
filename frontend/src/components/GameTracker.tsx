import { useState, useEffect } from "react";
import "../GameTracker.css";
import GameTable from "./GameTable";
import AddGameForm from "./AddGameForm";
import EditGameForm from "./EditGameForm";

interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  status: string;
  rating: number | null;
  created_at: string;
}

const API = "http://127.0.0.1:8000/games";

function GameTracker() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [editGame, setEditGame] = useState<{
    id: number;
    title: string;
    platform: string;
    genre: string;
    status: string;
    rating: string;
  } | null>(null);
  const [newGame, setNewGame] = useState({
    title: "",
    platform: "",
    genre: "",
    status: "",
    rating: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const ember = document.createElement("div");
      ember.className = "ember";
      ember.style.left = Math.random() * 100 + "vw";
      ember.style.bottom = "0";
      ember.style.animationDuration = 2 + Math.random() * 3 + "s";
      document.body.appendChild(ember);
      setTimeout(() => ember.remove(), 5000);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const fetchGames = () => {
    fetch(`${API}/`)
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch(() => setError("Failed to fetch, is FastAPI running?"));
  };

  const createGame = () => {
    fetch(`${API}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newGame,
        rating: newGame.rating === "" ? null : Number(newGame.rating),
      }),
    })
      .then(() => {
        fetchGames();
        setNewGame({ title: "", platform: "", genre: "", status: "", rating: "" });
      })
      .catch(() => setError("Failed to create game"));
  };

  const updateGame = () => {
    if (!editGame) return;
    fetch(`${API}/${editGame.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editGame,
        rating: editGame.rating === "" ? null : Number(editGame.rating),
      }),
    })
      .then(() => {
        fetchGames();
        setEditGame(null);
      })
      .catch(() => setError("Failed to update game."));
  };

  const deleteGame = (id: number) => {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(() => fetchGames())
      .catch(() => setError("Failed to delete."));
  };

  return (
    <div className="wrapper">
      <header>
        <h1>⚔ Game Tracker</h1>
        <p className="header-sub">Chronicle your conquests</p>
      </header>

      <div className="content">
        {error && <p className="error">{error}</p>}

        <AddGameForm
          newGame={newGame}
          onChange={setNewGame}
          onCreate={createGame}
          onLoad={fetchGames}
        />

        {editGame && (
          <EditGameForm
            editGame={editGame}
            onChange={setEditGame}
            onSave={updateGame}
            onCancel={() => setEditGame(null)}
          />
        )}

        <h3>The Registry</h3>
        <GameTable
          games={games}
          onDelete={deleteGame}
          onEdit={setEditGame}
        />
      </div>

      <footer>
        <p>Game Tracker</p>
      </footer>
    </div>
  );
}

export default GameTracker;