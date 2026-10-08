function MemeCard({ meme, onSelect }) {
  return (
    <div className="meme-card" onClick={() => onSelect(meme)}>
      <img
        src={meme.url}
        alt={meme.name}
        loading="lazy"
      />

      <div className="meme-card-content">
        <h3>{meme.name}</h3>

        <button onClick={() => onSelect(meme)}>
          Use this meme
        </button>
      </div>
    </div>
  );
}

export default MemeCard;