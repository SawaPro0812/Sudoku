import { useState, useCallback, useEffect, useRef } from 'react';
import { type Board, findErrors, isBoardComplete, copyBoard } from '../utils/solver';
import { type Difficulty, generatePuzzle } from '../utils/generator';
import { type GameState, saveGame, loadGame, clearSave } from '../utils/storage';
import { useTimer } from './useTimer';

export function useSudoku() {
  const [puzzle, setPuzzle] = useState<Board>([]);
  const [solution, setSolution] = useState<Board>([]);
  const [userBoard, setUserBoard] = useState<Board>([]);
  const [memos, setMemos] = useState<number[][][]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isMemoMode, setIsMemoMode] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState<boolean[][]>(Array.from({ length: 9 }, () => Array(9).fill(false)));
  const [gameStarted, setGameStarted] = useState(false);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const timer = useTimer(0);
  const initialized = useRef(false);

  // Load saved game on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const saved = loadGame();
    if (saved) {
      setPuzzle(saved.puzzle);
      setSolution(saved.solution);
      setUserBoard(saved.userBoard);
      setMemos(saved.memos);
      setDifficulty(saved.difficulty);
      setSelectedCell(saved.selectedCell);
      setIsComplete(saved.isComplete);
      setErrors(findErrors(saved.userBoard));
      setMistakeCount(saved.mistakeCount);
      setHintCount(saved.hintCount);
      setGameStarted(true);
      if (!saved.isComplete) {
        timer.reset(saved.elapsedSeconds);
        setTimeout(() => timer.start(), 0);
      } else {
        timer.reset(saved.elapsedSeconds);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save
  useEffect(() => {
    if (!gameStarted || puzzle.length === 0) return;
    const state: GameState = {
      puzzle, solution, userBoard, memos, difficulty,
      elapsedSeconds: timer.seconds, selectedCell, isComplete,
      mistakeCount, hintCount,
    };
    saveGame(state);
  }, [puzzle, solution, userBoard, memos, difficulty, timer.seconds, selectedCell, isComplete, gameStarted, mistakeCount, hintCount]);

  const newGame = useCallback((diff: Difficulty) => {
    const { puzzle: p, solution: s } = generatePuzzle(diff);
    const board = copyBoard(p);
    const emptyMemos: number[][][] = Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => [])
    );
    setPuzzle(p);
    setSolution(s);
    setUserBoard(board);
    setMemos(emptyMemos);
    setDifficulty(diff);
    setSelectedCell(null);
    setIsMemoMode(false);
    setIsComplete(false);
    setErrors(Array.from({ length: 9 }, () => Array(9).fill(false)));
    setMistakeCount(0);
    setHintCount(0);
    setGameStarted(true);
    clearSave();
    timer.reset(0);
    setTimeout(() => timer.start(), 0);
  }, [timer]);

  const selectCell = useCallback((row: number, col: number) => {
    if (isComplete) return;
    setSelectedCell([row, col]);
  }, [isComplete]);

  const inputNumber = useCallback((num: number) => {
    if (!selectedCell || isComplete) return;
    const [r, c] = selectedCell;
    if (puzzle[r][c] !== 0) return;

    if (isMemoMode) {
      setMemos(prev => {
        const next = prev.map(row => row.map(cell => [...cell]));
        const idx = next[r][c].indexOf(num);
        if (idx >= 0) {
          next[r][c].splice(idx, 1);
        } else {
          next[r][c].push(num);
          next[r][c].sort();
        }
        return next;
      });
    } else {
      // Check if the number is wrong (compared to solution)
      if (num !== solution[r][c]) {
        setMistakeCount(prev => prev + 1);
      }

      setUserBoard(prev => {
        const next = copyBoard(prev);
        next[r][c] = num;
        const errs = findErrors(next);
        setErrors(errs);
        if (isBoardComplete(next)) {
          setIsComplete(true);
          timer.stop();
        }
        return next;
      });
      setMemos(prev => {
        const next = prev.map(row => row.map(cell => [...cell]));
        next[r][c] = [];
        return next;
      });
    }
  }, [selectedCell, isComplete, puzzle, solution, isMemoMode, timer]);

  const eraseCell = useCallback(() => {
    if (!selectedCell || isComplete) return;
    const [r, c] = selectedCell;
    if (puzzle[r][c] !== 0) return;

    setUserBoard(prev => {
      const next = copyBoard(prev);
      next[r][c] = 0;
      setErrors(findErrors(next));
      return next;
    });
    setMemos(prev => {
      const next = prev.map(row => row.map(cell => [...cell]));
      next[r][c] = [];
      return next;
    });
  }, [selectedCell, isComplete, puzzle]);

  const giveHint = useCallback(() => {
    if (isComplete) return;
    const emptyCells: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (userBoard[r][c] === 0) {
          emptyCells.push([r, c]);
        }
      }
    }
    if (emptyCells.length === 0) return;

    setHintCount(prev => prev + 1);

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    setUserBoard(prev => {
      const next = copyBoard(prev);
      next[r][c] = solution[r][c];
      setErrors(findErrors(next));
      if (isBoardComplete(next)) {
        setIsComplete(true);
        timer.stop();
      }
      return next;
    });
    setMemos(prev => {
      const next = prev.map(row => row.map(cell => [...cell]));
      next[r][c] = [];
      return next;
    });
    setSelectedCell([r, c]);
  }, [isComplete, userBoard, solution, timer]);

  const toggleMemoMode = useCallback(() => {
    setIsMemoMode(prev => !prev);
  }, []);

  return {
    puzzle, userBoard, memos, difficulty, selectedCell, isMemoMode,
    isComplete, errors, gameStarted, timer, mistakeCount, hintCount,
    newGame, selectCell, inputNumber, eraseCell, giveHint, toggleMemoMode,
  };
}
