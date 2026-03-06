import type { Board } from './solver';
import type { Difficulty } from './generator';

export interface GameState {
  puzzle: Board;
  solution: Board;
  userBoard: Board;
  memos: number[][][];
  difficulty: Difficulty;
  elapsedSeconds: number;
  selectedCell: [number, number] | null;
  isComplete: boolean;
  mistakeCount: number;
  hintCount: number;
}

const STORAGE_KEY = 'sudoku-save';

export function saveGame(state: GameState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function loadGame(): GameState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data) as GameState;
    // backward compat
    if (parsed.mistakeCount === undefined) parsed.mistakeCount = 0;
    if (parsed.hintCount === undefined) parsed.hintCount = 0;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSave(): void {
  localStorage.removeItem(STORAGE_KEY);
}
