export interface CellState {
  revealed: boolean;
  isBomb: boolean;
  marked: boolean;
  adjacentCount: number;
}

export interface GameState {
  board: CellState[][];
  mineCount: number;
  revealedCount: number;
  gameOver: boolean;
}
