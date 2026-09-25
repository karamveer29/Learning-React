function Scoreboard({ scores, onResetScore }) {
  return (
    <div className="scoreboard">
      <div className="score-item score-x">
        <span className="score-label">Player X</span>
        <span className="score-value">{scores.x}</span>
      </div>
      <div className="score-item score-draw">
        <span className="score-label">Draws</span>
        <span className="score-value">{scores.draws}</span>
      </div>
      <div className="score-item score-o">
        <span className="score-label">Player O</span>
        <span className="score-value">{scores.o}</span>
      </div>
      <button className="btn btn-reset-score" onClick={onResetScore}>
        Reset Score
      </button>
    </div>
  );
}
 
export default Scoreboard;