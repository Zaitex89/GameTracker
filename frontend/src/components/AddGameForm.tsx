interface NewGame {
  title: string;
  platform: string;
  genre: string;
  status: string;
  rating: string;
}

interface Props {
  newGame: NewGame;
  onChange: (game: NewGame) => void;
  onCreate: () => void;
  onLoad: () => void;
}

function AddGameForm({ newGame, onChange, onCreate, onLoad }: Props) {
  return (
    <>
      <h3>Add to the Codex</h3>
      <div className="form">
        <input
          placeholder="Title"
          value={newGame.title}
          onChange={(e) => onChange({ ...newGame, title: e.target.value })}
        />
        <input
          placeholder="Platform"
          value={newGame.platform}
          onChange={(e) => onChange({ ...newGame, platform: e.target.value })}
        />
        <input
          placeholder="Genre"
          value={newGame.genre}
          onChange={(e) => onChange({ ...newGame, genre: e.target.value })}
        />
        <input
          placeholder="Status"
          value={newGame.status}
          onChange={(e) => onChange({ ...newGame, status: e.target.value })}
        />
        <input
          placeholder="Rating 1-10"
          value={newGame.rating}
          onChange={(e) => onChange({ ...newGame, rating: e.target.value })}
        />
        <button className="btn-add" onClick={onCreate}>+ Inscribe</button>
        <button onClick={onLoad}>📜 Load</button>
      </div>
    </>
  );
}

export default AddGameForm;