import { Clock, Home, XCircle, Lightbulb } from 'lucide-react';
import type { Difficulty } from '../utils/generator';

interface HeaderProps {
  difficulty: Difficulty;
  timerFormatted: string;
  mistakeCount: number;
  hintCount: number;
  onHome: () => void;
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: '初級',
  medium: '中級',
  hard: '上級',
};

export default function Header({ difficulty, timerFormatted, mistakeCount, hintCount, onHome }: HeaderProps) {
  return (
    <div className="w-full bg-slate-800/80 pt-2 pb-1">
      {/* Safe area spacer for iPhone notch/Dynamic Island */}
      <div style={{ height: 'env(safe-area-inset-top)' }} />

      {/* Title row */}
      <div className="flex items-center justify-between px-4 py-1">
        <button
          onClick={onHome}
          className="flex items-center gap-1.5 text-slate-400 text-sm active:text-white px-2 py-1 rounded-lg"
        >
          <Home size={16} />
          <span className="text-xs">ホーム</span>
        </button>
        <h1 className="text-lg font-bold text-white tracking-wide">
          数独
          <span className="text-xs font-normal text-slate-400 ml-2">
            {DIFFICULTY_LABEL[difficulty]}
          </span>
        </h1>
        {/* Spacer for centering */}
        <div className="w-16" />
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-5 px-4 py-1">
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Clock size={14} />
          <span className="font-mono tabular-nums">{timerFormatted}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <XCircle size={14} className="text-red-400/70" />
          <span>ミス: <span className="text-red-400 font-semibold">{mistakeCount}</span></span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 text-xs">
          <Lightbulb size={14} className="text-amber-400/70" />
          <span>ヒント: <span className="text-amber-400 font-semibold">{hintCount}</span></span>
        </div>
      </div>
    </div>
  );
}
