function Gamestatus({ winner, isDraw, currentPlayer }) {
  let message;

  if (winner) {
    message = `Player ${winner} Wins! 🎉`;
  } else if (isDraw) {
    message = "It's a Draw! 🤝";
  } else {
    message = `Player ${currentPlayer}'s Turn`;
  }

  let statusClass = "game-status";
  if (winner) statusClass += " status-win";
  if (isDraw) statusClass += " status-draw";

  return <div className={statusClass}>{message}</div>;
}

export default Gamestatus;