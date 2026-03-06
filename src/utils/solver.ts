export type Board = number[][];

export function isValid(board: Board, row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }
  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

export function solve(board: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solve(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function countSolutions(board: Board, limit: number = 2): number {
  let count = 0;

  function backtrack(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num)) {
              board[r][c] = num;
              if (backtrack()) return true;
              board[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    count++;
    return count >= limit;
  }

  backtrack();
  return count;
}

export function findErrors(board: Board): boolean[][] {
  const errors: boolean[][] = Array.from({ length: 9 }, () => Array(9).fill(false));

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === 0) continue;

      // Check row duplicates
      for (let c2 = 0; c2 < 9; c2++) {
        if (c2 !== c && board[r][c2] === val) {
          errors[r][c] = true;
          errors[r][c2] = true;
        }
      }
      // Check col duplicates
      for (let r2 = 0; r2 < 9; r2++) {
        if (r2 !== r && board[r2][c] === val) {
          errors[r][c] = true;
          errors[r2][c] = true;
        }
      }
      // Check box duplicates
      const boxRow = Math.floor(r / 3) * 3;
      const boxCol = Math.floor(c / 3) * 3;
      for (let r2 = boxRow; r2 < boxRow + 3; r2++) {
        for (let c2 = boxCol; c2 < boxCol + 3; c2++) {
          if ((r2 !== r || c2 !== c) && board[r2][c2] === val) {
            errors[r][c] = true;
            errors[r2][c2] = true;
          }
        }
      }
    }
  }
  return errors;
}

export function isBoardComplete(board: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  // Also check no errors
  const errors = findErrors(board);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (errors[r][c]) return false;
    }
  }
  return true;
}

export function copyBoard(board: Board): Board {
  return board.map(row => [...row]);
}
