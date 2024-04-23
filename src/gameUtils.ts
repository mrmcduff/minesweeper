import { CellState, GameState } from "./types";

const ADJACENT = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function makeCell(isBomb: boolean): CellState {
  return {
    isBomb,
    marked: false,
    adjacentCount: 0,
    revealed: false,
  }
}


export function revealCell(board: CellState[][], x: number, y: number): number {
  if (x < 0 || x >= board[0].length || y < 0 || y >= board.length || board[y][x].revealed || board[y][x].marked) {
    return 0;
  }

  board[y][x].revealed = true;
  let revealed = 1;
  if (board[y][x].adjacentCount > 0) {
    return revealed;
  }

  for (const [dx, dy] of ADJACENT) {
    revealed += revealCell(board, x + dx, y + dy);
  }
  return revealed;
}

function updateNeighbors([bombRow, bombCol]: [number, number], board: CellState[][]) {
  board[bombRow][bombCol].adjacentCount = 0;
  for (const [dx, dy] of ADJACENT) {
    const stepX = bombCol + dx;
    const stepY = bombRow + dy;
    if (stepX >= 0 && stepY >= 0) {
      if (stepY < board.length) {
        if (stepX < board[stepY].length) {
          if (!board[stepY][stepX].isBomb) {
            board[stepY][stepX].adjacentCount += 1;
          }
        }
      }
    }
  }
}

export function initializeGame(width: number, height: number, mineCount: number): GameState {
  // Generate the game board and place the mines
  const board = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => Math.random() < mineCount / (width * height) ? makeCell(false) : makeCell(false))
  );
  let remainingMines = mineCount;

  // this will be n^2 in the number of bombs
  while (remainingMines > 0) {
    const randRow = Math.floor(Math.random() * height);
    const randCol = Math.floor(Math.random() * width);
    if (!board[randRow][randCol].isBomb) {
      board[randRow][randCol].isBomb = true;
      updateNeighbors([randRow, randCol], board);
      remainingMines = remainingMines - 1;
    }
  }

  // initializeCellCountsByBombs(board, bombs);

  return {
    board,
    mineCount,
    revealedCount: 0,
    gameOver: false,
  };
}
