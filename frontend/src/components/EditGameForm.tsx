interface EditGame {
  id: number;
  title: string;
  platform: string;
  genre: string;
  status: string;
  rating: string;
}

interface Props {
  editGame: EditGame;
  onChange: (game: EditGame) => void;
  onSave: () => void;
  onCancel: () => void;
}

function EditGameForm({ editGame, onChange, onSave, onCancel }: Props) {
  return (
    <div className="edit-panel">
      <h3>Edit Entry</h3>
      <div className="form">
        <input
          placeholder="Title"
          value={editGame.title}
          onChange={(e) => onChange({ ...editGame, title: e.target.value })}
        />
        <input
          placeholder="Platform"
          value={editGame.platform}
          onChange={(e) => onChange({ ...editGame, platform: e.target.value })}
        />
        <input
          placeholder="Genre"
          value={editGame.genre}
          onChange={(e) => onChange({ ...editGame, genre: e.target.value })}
        />
        <input
          placeholder="Status"
          value={editGame.status}
          onChange={(e) => onChange({ ...editGame, status: e.target.value })}
        />
        <input
          placeholder="Rating 1-10"
          value={editGame.rating}
          onChange={(e) => onChange({ ...editGame, rating: e.target.value })}
        />
      </div>
      <button className="btn-save" onClick={onSave}>Save</button>
      <button className="btn-cancel" onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditGameForm;