interface CellProps {
  value: number;
  isInitial: boolean;
  isSelected: boolean;
  isSameRow: boolean;
  isSameCol: boolean;
  isSameBox: boolean;
  isSameNumber: boolean;
  isError: boolean;
  memos: number[];
  onClick: () => void;
}

export default function Cell({
  value, isInitial, isSelected, isSameRow, isSameCol, isSameBox,
  isSameNumber, isError, memos, onClick,
}: CellProps) {
  let bg = 'bg-slate-800';
  if (isSameRow || isSameCol || isSameBox) bg = 'bg-slate-700';
  if (isSameNumber && value !== 0) bg = 'bg-indigo-900/60';
  if (isSelected) bg = 'bg-indigo-600';

  let textColor = isInitial ? 'text-slate-100' : 'text-sky-400';
  if (isError && value !== 0) textColor = 'text-red-400';

  return (
    <button
      className={`${bg} ${textColor} w-full aspect-square flex items-center justify-center text-base font-semibold relative select-none active:opacity-80 transition-colors duration-100`}
      onClick={onClick}
    >
      {value !== 0 ? (
        <span className="text-[min(5vw,20px)] leading-none">{value}</span>
      ) : memos.length > 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-[1px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <span
              key={n}
              className="flex items-center justify-center text-[min(2.5vw,9px)] leading-none text-slate-400"
            >
              {memos.includes(n) ? n : ''}
            </span>
          ))}
        </div>
      ) : null}
    </button>
  );
}
