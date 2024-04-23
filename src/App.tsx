import { useState } from 'react'
import './App.css'
import { Board } from './components/Board';
import { initializeGame, revealCell } from './gameUtils';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame(10, 10, 10));

  function reInitGame() {
    setGameState(initializeGame(10, 10, 10));
  }
  const handleCellClick = (x: number, y: number) => {
    if (gameState.gameOver) return;

    const newBoard = [...gameState.board];
    if (newBoard[y][x].isBomb) {
      setGameState({ ...gameState, gameOver: true });
    } else {
      const revealed = revealCell(newBoard, x, y);
      setGameState({
        ...gameState,
        board: newBoard,
        revealedCount: gameState.revealedCount + revealed,
        gameOver: gameState.revealedCount + 1 === gameState.board.length * gameState.board[0].length - gameState.mineCount,
      });
    }
  };

  const handleCellMark = (x: number, y: number) => {
    if (gameState.gameOver) return;

    const wasMarked = gameState.board[y][x].marked;
    const newBoard = [...gameState.board];
    newBoard[y][x].marked = !wasMarked;
    setGameState({
      ...gameState,
      board: newBoard,
    });
  }

  return (
    <div className="app">
      {gameState.gameOver && <div>Game Over</div>}
      <div>{`Remaining mines: ${gameState.mineCount}`}</div>
      <button onClick={reInitGame}>Reset</button>
      <Board state={gameState} onCellClick={handleCellClick} onCellMark={handleCellMark}/>
    </div>
  );
};

export default App
