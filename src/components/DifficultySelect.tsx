import { ArrowLeft } from 'lucide-react';
import type { Difficulty } from '../utils/generator';

interface DifficultySelectProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const options: { key: Difficulty; label: string; desc: string }[] = [
  { key: 'easy', label: '初級', desc: 'はじめての方に' },
  { key: 'medium', label: '中級', desc: '少し手ごたえあり' },
  { key: 'hard', label: '上級', desc: '上級者向け' },
];

export default function DifficultySelect({ onSelect, onBack }: DifficultySelectProps) {
  return (
    <div className="flex flex-col h-full px-6">
      <div className="pt-4" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-400 active:text-indigo-300 text-sm py-2 px-1 rounded-lg"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">ホーム</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-white">難易度を選択</h2>
          <p className="text-slate-400 text-sm">新しいゲームを開始します</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {options.map(({ key, label, desc }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="w-full py-4 px-6 rounded-2xl bg-slate-800 border border-slate-700 active:bg-slate-700 text-left transition-colors"
            >
              <span className="text-white font-semibold text-lg">{label}</span>
              <span className="block text-slate-400 text-sm mt-0.5">{desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
