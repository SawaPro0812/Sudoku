import { Eraser, Lightbulb, PenLine, Pencil } from 'lucide-react';

interface NumberPadProps {
  isMemoMode: boolean;
  onNumber: (num: number) => void;
  onErase: () => void;
  onHint: () => void;
  onToggleMemo: () => void;
}

export default function NumberPad({
  isMemoMode, onNumber, onErase, onHint, onToggleMemo,
}: NumberPadProps) {
  return (
    <div className="w-full px-3 pb-4">
      {/* Action buttons */}
      <div className="flex justify-center gap-5 mb-3">
        <button
          onClick={onErase}
          className="flex flex-col items-center justify-center w-16 h-14 rounded-xl bg-slate-700 active:bg-slate-600 text-slate-300"
        >
          <Eraser size={22} />
          <span className="text-[10px] mt-0.5">消去</span>
        </button>
        <button
          onClick={onToggleMemo}
          className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl active:opacity-80 ${
            isMemoMode ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
          }`}
        >
          {isMemoMode ? <Pencil size={22} /> : <PenLine size={22} />}
          <span className="text-[10px] mt-0.5">{isMemoMode ? 'メモ' : '入力'}</span>
        </button>
        <button
          onClick={onHint}
          className="flex flex-col items-center justify-center w-16 h-14 rounded-xl bg-slate-700 active:bg-slate-600 text-slate-300"
        >
          <Lightbulb size={22} />
          <span className="text-[10px] mt-0.5">ヒント</span>
        </button>
      </div>

      {/* Number buttons - 5 + 4 layout for bigger buttons */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            onClick={() => onNumber(num)}
            className="h-14 rounded-xl bg-slate-700 active:bg-slate-500 text-white text-2xl font-bold flex items-center justify-center"
          >
            {num}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 px-[10%]">
        {[6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => onNumber(num)}
            className="h-14 rounded-xl bg-slate-700 active:bg-slate-500 text-white text-2xl font-bold flex items-center justify-center"
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
