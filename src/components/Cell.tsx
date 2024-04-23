
import '../App.css'
import { CellState } from '../types';

export const Cell: React.FC<{ value: CellState; onClick: () => void; onMark: () => void }> = ({ value, onClick, onMark }) => {
  const renderContents = () => {
    if (value.marked) {
      return  '\u{1F6A9}'
    }
    if (!value.revealed) {
      return '?';
    }
    return value.isBomb ? '💣' : value.adjacentCount === 0 ? '' : value.adjacentCount;
  }

  const handleMark = (event: React.MouseEvent) => {
    event.preventDefault();
    onMark();
  }

  return (
    <div className="cell" onClick={onClick} onContextMenu={handleMark}>
      {renderContents()}
    </div>
  );
};
