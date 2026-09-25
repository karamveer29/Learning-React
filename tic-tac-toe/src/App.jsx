import { useState } from "react";
import Board from "./components/Board";
import GameStatus from "./components/Gamestatus";
import ScoreBoard from "./components/Scoreboard";

import "./App.css";
 

const WINNING_LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];
 
                               
function calculateWinner(squares) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
 

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
 
function App() {

  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);
 

  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
 

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : null;
 

  const isDraw = !winner && squares.every((square) => square !== null);
 
  const gameIsOver = winner !== null || isDraw;
 

  function handleSquareClick(index) {

    if (squares[index] || gameIsOver) {
      return;
    }
 

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);

    const moveResult = calculateWinner(nextSquares);
    if (moveResult) {
      updateScore(moveResult.winner);
    } else if (nextSquares.every((square) => square !== null)) {
      updateScore("draw");
    }
 

    setXIsNext((prev) => !prev);
  }
 

  function updateScore(outcome) {
    setScores((prevScores) => {
      if (outcome === "X") {
        return { ...prevScores, x: prevScores.x + 1 };
      } else if (outcome === "O") {
        return { ...prevScores, o: prevScores.o + 1 };
      } else {
        return { ...prevScores, draws: prevScores.draws + 1 };
      }
    });
  }
 

  function handleRestartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
 

  function handleResetScore() {
    setScores({ x: 0, o: 0, draws: 0 });
  }
 
  return (
    <div className="page">
      <div className="game-card">
        <h1 className="game-title">Tic Tac Toe</h1>
 
        <ScoreBoard scores={scores} onResetScore={handleResetScore} />
 
        <GameStatus
          winner={winner}
          isDraw={isDraw}
          currentPlayer={xIsNext ? "X" : "O"}
        />
 
        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />
 
        <button className="btn btn-restart" onClick={handleRestartGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
}
 
export default App;