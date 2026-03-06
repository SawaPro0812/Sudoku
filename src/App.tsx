import { useState } from 'react';
import { useSudoku } from './hooks/useSudoku';
import Board from './components/Board';
import NumberPad from './components/NumberPad';
import Header from './components/Header';
import DifficultySelect from './components/DifficultySelect';
import CelebrationModal from './components/CelebrationModal';
import type { Difficulty } from './utils/generator';

export default function App() {
  const game = useSudoku();
  const [showDifficultySelect, setShowDifficultySelect] = useState(false);

  const handleNewGame = () => {
    setShowDifficultySelect(true);
  };

  const handleSelectDifficulty = (diff: Difficulty) => {
    setShowDifficultySelect(false);
    game.newGame(diff);
  };

  if (!game.gameStarted || showDifficultySelect) {
    return (
      <div className="h-full max-w-md mx-auto bg-slate-900">
        <DifficultySelect onSelect={handleSelectDifficulty} />
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
        onNewGame={handleNewGame}
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
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
}
