import { type Board, isValid, solve, countSolutions, copyBoard } from './solver';

export type Difficulty = 'easy' | 'medium' | 'hard';

const CLUES_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 38,
  medium: 30,
  hard: 24,
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateFullBoard(): Board {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill(0));

  function fill(pos: number): boolean {
    if (pos === 81) return true;
    const r = Math.floor(pos / 9);
    const c = pos % 9;
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of nums) {
      if (isValid(board, r, c, num)) {
        board[r][c] = num;
        if (fill(pos + 1)) return true;
        board[r][c] = 0;
      }
    }
    return false;
  }

  fill(0);
  return board;
}

export function generatePuzzle(difficulty: Difficulty): { puzzle: Board; solution: Board } {
  const solution = generateFullBoard();
  const puzzle = copyBoard(solution);
  const targetClues = CLUES_BY_DIFFICULTY[difficulty];
  const totalToRemove = 81 - targetClues;

  // Create shuffled list of all positions
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9] as [number, number])
  );

  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= totalToRemove) break;
    const backup = puzzle[r][c];
    puzzle[r][c] = 0;

    const test = copyBoard(puzzle);
    if (countSolutions(test, 2) === 1) {
      removed++;
    } else {
      puzzle[r][c] = backup;
    }
  }

  return { puzzle, solution };
}
