import MemeCard from "./MemeCard";
function MemeList({ memes, onSelect }) {
  return (
    <section className="meme-section" id="templates">
      <div className="section-heading">
        <h2>Popular Meme Templates</h2>
        <p>Select a template and create your meme.</p>
      </div>
      <div className="meme-grid">
        {memes.map((meme) => (
          <MemeCard key={meme.id} meme={meme} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

export default MemeList;
