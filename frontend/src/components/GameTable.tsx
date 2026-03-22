interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  status: string;
  rating: number | null;
  created_at: string;
}

interface Props {
  games: Game[];
  onDelete: (id: number) => void;
  onEdit: (game: { id: number; title: string; platform: string; genre: string; status: string; rating: string }) => void;
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "playing":  return "status-playing";
    case "done":     return "status-done";
    case "backlog":  return "status-backlog";
    case "dropped":  return "status-dropped";
    default:         return "";
  }
};

const getRatingStars = (rating: number | null) => {
  if (!rating) return "—";
  return "★".repeat(Math.min(rating, 10));
};

function GameTable({ games, onDelete, onEdit }: Props) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Platform</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>{game.platform}</td>
              <td>{game.genre}</td>
              <td>
                <span className={getStatusClass(game.status)}>{game.status}</span>
              </td>
              <td>
                <span className="rating">{getRatingStars(game.rating)}</span>
              </td>
              <td>
                <button
                  onClick={() =>
                    onEdit({
                      id: game.id,
                      title: game.title,
                      platform: game.platform,
                      genre: game.genre,
                      status: game.status,
                      rating: String(game.rating),
                    })
                  }
                >
                  Edit
                </button>
                <button className="btn-delete" onClick={() => onDelete(game.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameTable;