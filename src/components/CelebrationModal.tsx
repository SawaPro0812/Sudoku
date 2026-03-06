import { useMemo } from 'react';
import { Trophy } from 'lucide-react';
import type { Difficulty } from '../utils/generator';

interface CelebrationModalProps {
  timerFormatted: string;
  difficulty: Difficulty;
  mistakeCount: number;
  hintCount: number;
  onHome: () => void;
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: '初級',
  medium: '中級',
  hard: '上級',
};

const CONFETTI_COLORS = ['#fbbf24', '#f87171', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'];

export default function CelebrationModal({ timerFormatted, difficulty, mistakeCount, hintCount, onHome }: CelebrationModalProps) {
  const confetti = useMemo(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 1}s`,
      duration: `${2 + Math.random() * 2}s`,
      size: 8,
      round: Math.random() > 0.5,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    }))
  , []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {confetti.map((c, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: c.left,
            animationDelay: c.delay,
            animationDuration: c.duration,
          }}
        >
          <div
            style={{
              width: c.size,
              height: c.size,
              borderRadius: c.round ? '50%' : '0%',
              backgroundColor: c.color,
            }}
          />
        </div>
      ))}

      <div className="animate-celebration bg-slate-800 rounded-3xl p-8 mx-6 text-center border border-slate-600 shadow-2xl relative z-10 w-72">
        <Trophy size={56} className="text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">クリア!</h2>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm text-slate-300 px-2">
            <span>難易度</span>
            <span className="font-semibold text-white">{DIFFICULTY_LABEL[difficulty]}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-300 px-2">
            <span>タイム</span>
            <span className="font-mono font-bold text-indigo-400 text-lg">{timerFormatted}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-300 px-2">
            <span>ミス回数</span>
            <span className="font-semibold text-red-400">{mistakeCount}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-300 px-2">
            <span>ヒント回数</span>
            <span className="font-semibold text-amber-400">{hintCount}</span>
          </div>
        </div>

        <button
          onClick={onHome}
          className="w-full py-3 rounded-xl bg-indigo-600 active:bg-indigo-500 text-white font-semibold text-lg"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
}
