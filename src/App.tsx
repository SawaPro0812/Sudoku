import { useState, useEffect } from 'react';
import { useSudoku } from './hooks/useSudoku';
import Board from './components/Board';
import NumberPad from './components/NumberPad';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import DifficultySelect from './components/DifficultySelect';
import CelebrationModal from './components/CelebrationModal';
import { loadGame } from './utils/storage';
import { checkForUpdate } from './utils/updateChecker';
import type { Difficulty } from './utils/generator';

type Screen = 'home' | 'difficulty' | 'game';

export default function App() {
  const game = useSudoku();
  const [screen, setScreen] = useState<Screen>('home');
  const [hasSavedGame, setHasSavedGame] = useState(false);

  // Check saved game existence on mount and when returning to home
  useEffect(() => {
    if (screen === 'home') {
      const saved = loadGame();
      setHasSavedGame(saved !== null && !saved.isComplete);
    }
  }, [screen]);

  // Daily update check (runs once on mount)
  useEffect(() => {
    checkForUpdate();
  }, []);

  const handleContinue = () => {
    game.resumeGame();
    setScreen('game');
  };

  const handleSelectDifficulty = (diff: Difficulty) => {
    game.newGame(diff);
    setScreen('game');
  };

  const handleGoHome = () => {
    game.pauseGame();
    setScreen('home');
  };

  if (screen === 'home') {
    return (
      <div className="h-full max-w-md mx-auto bg-slate-900">
        <HomeScreen
          hasSavedGame={hasSavedGame}
          onNewGame={() => setScreen('difficulty')}
          onContinue={handleContinue}
        />
      </div>
    );
  }

  if (screen === 'difficulty') {
    return (
      <div className="h-full max-w-md mx-auto bg-slate-900">
        <DifficultySelect
          onSelect={handleSelectDifficulty}
          onBack={() => setScreen('home')}
        />
      </div>
    );
  }

  return (
    <div className="h-full max-w-md mx-auto bg-slate-900 flex flex-col">
      <Header
        difficulty={game.difficulty}
        timerFormatted={game.timer.formatted}
        mistakeCount={game.mistakeCount}
        hintCount={game.hintCount}
        onHome={handleGoHome}
      />

      <div className="flex-1 flex flex-col justify-center gap-3 min-h-0">
        <Board
          puzzle={game.puzzle}
          userBoard={game.userBoard}
          memos={game.memos}
          selectedCell={game.selectedCell}
          errors={game.errors}
          onCellClick={game.selectCell}
        />

        <NumberPad
          isMemoMode={game.isMemoMode}
          onNumber={game.inputNumber}
          onErase={game.eraseCell}
          onHint={game.giveHint}
          onToggleMemo={game.toggleMemoMode}
        />
      </div>

      {game.isComplete && (
        <CelebrationModal
          timerFormatted={game.timer.formatted}
          difficulty={game.difficulty}
          mistakeCount={game.mistakeCount}
          hintCount={game.hintCount}
          onHome={handleGoHome}
        />
      )}
    </div>
  );
}
