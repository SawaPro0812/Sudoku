import { Grid3X3 } from 'lucide-react';
import type { Difficulty } from '../utils/generator';

interface DifficultySelectProps {
  onSelect: (difficulty: Difficulty) => void;
}

const options: { key: Difficulty; label: string; desc: string }[] = [
  { key: 'easy', label: '初級', desc: 'はじめての方に' },
  { key: 'medium', label: '中級', desc: '少し手ごたえあり' },
  { key: 'hard', label: '上級', desc: '上級者向け' },
];

export default function DifficultySelect({ onSelect }: DifficultySelectProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 gap-8">
      <div className="flex flex-col items-center gap-3">
        <Grid3X3 size={48} className="text-indigo-400" />
        <h1 className="text-3xl font-bold text-white">数独</h1>
        <p className="text-slate-400 text-sm">難易度を選んでください</p>
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
  );
}
