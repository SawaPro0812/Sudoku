import { Grid3X3, Play, PlusCircle } from 'lucide-react';
import { APP_VERSION } from '../utils/version';

interface HomeScreenProps {
  hasSavedGame: boolean;
  onNewGame: () => void;
  onContinue: () => void;
}

export default function HomeScreen({ hasSavedGame, onNewGame, onContinue }: HomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Grid3X3 size={56} className="text-indigo-400" />
          <h1 className="text-4xl font-bold text-white">数独</h1>
          <p className="text-slate-500 text-sm">Sudoku Puzzle</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={onNewGame}
            className="w-full py-4 px-6 rounded-2xl bg-indigo-600 border border-indigo-500 active:bg-indigo-500 text-left transition-colors flex items-center gap-4"
          >
            <PlusCircle size={24} className="text-white" />
            <div>
              <span className="text-white font-semibold text-lg">新規ゲーム</span>
              <span className="block text-indigo-200 text-sm mt-0.5">難易度を選んで開始</span>
            </div>
          </button>

          <button
            onClick={onContinue}
            disabled={!hasSavedGame}
            className={`w-full py-4 px-6 rounded-2xl border text-left transition-colors flex items-center gap-4 ${
              hasSavedGame
                ? 'bg-slate-800 border-slate-700 active:bg-slate-700'
                : 'bg-slate-800/40 border-slate-700/50 opacity-40 cursor-not-allowed'
            }`}
          >
            <Play size={24} className={hasSavedGame ? 'text-slate-300' : 'text-slate-500'} />
            <div>
              <span className={`font-semibold text-lg ${hasSavedGame ? 'text-white' : 'text-slate-500'}`}>
                続きから
              </span>
              <span className={`block text-sm mt-0.5 ${hasSavedGame ? 'text-slate-400' : 'text-slate-600'}`}>
                {hasSavedGame ? '前回の続きを再開' : 'セーブデータなし'}
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="pb-6 pt-4">
        <p className="text-slate-600 text-xs">v{APP_VERSION}</p>
      </div>
    </div>
  );
}
