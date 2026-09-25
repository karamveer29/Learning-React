import Square from "./Square";
 
function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="board">
      {squares.map((value, index) => {
  
        const isWinningSquare = winningLine
          ? winningLine.some((winIndex) => winIndex === index)
          : false;
 
        return (
          <Square
            key={index} 
            value={value}
            onSquareClick={() => onSquareClick(index)}
            isWinningSquare={isWinningSquare}
          />
        );
      })}
    </div>
  );
}
 
export default Board;