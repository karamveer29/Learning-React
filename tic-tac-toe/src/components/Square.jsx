function Square({ value, onSquareClick, isWinningSquare }) {
  let squareClass = "square";

  if (value === "X") squareClass += " square-x";
  if (value === "O") squareClass += " square-o";
  if (isWinningSquare) squareClass += " winning-square";

  return (
    <button type="button" className={squareClass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;