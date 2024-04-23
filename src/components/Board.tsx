import '../App.css'
import { GameState } from '../types';
import { Cell } from "./Cell";


export const Board: React.FC<{ state: GameState; onCellClick: (x: number, y: number) => void; onCellMark: (x: number, y: number) => void }> = ({
  state,
  onCellClick,
  onCellMark,
}) => {
  return (
    <div className="board">
      {state.board.map((row, y) =>
        row.map((cell, x) => (
          <Cell key={`${x},${y}`} value={cell} onClick={() => onCellClick(x, y)} onMark={() => onCellMark(x, y)}/>
        ))
      )}
    </div>
  );
};
