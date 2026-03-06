import type { Board as BoardType } from '../utils/solver';
import Cell from './Cell';

interface BoardProps {
  puzzle: BoardType;
  userBoard: BoardType;
  memos: number[][][];
  selectedCell: [number, number] | null;
  errors: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

export default function Board({
  puzzle, userBoard, memos, selectedCell, errors, onCellClick,
}: BoardProps) {
  const selectedVal = selectedCell ? userBoard[selectedCell[0]][selectedCell[1]] : 0;

  return (
    <div className="w-full px-2">
      <div className="sudoku-grid mx-auto">
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => {
            const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
            const isSameRow = selectedCell !== null && selectedCell[0] === r && !isSelected;
            const isSameCol = selectedCell !== null && selectedCell[1] === c && !isSelected;
            const isSameBox = selectedCell !== null &&
              Math.floor(selectedCell[0] / 3) === Math.floor(r / 3) &&
              Math.floor(selectedCell[1] / 3) === Math.floor(c / 3) &&
              !isSelected;
            const isSameNumber = selectedVal !== 0 && userBoard[r][c] === selectedVal && !isSelected;

            // 3x3ブロック境界の太い線
            const thickRight = c % 3 === 2 && c !== 8;
            const thickBottom = r % 3 === 2 && r !== 8;
            const cellClasses = [
              'sudoku-cell',
              thickRight ? 'border-right-thick' : '',
              thickBottom ? 'border-bottom-thick' : '',
            ].filter(Boolean).join(' ');

            return (
              <div key={`${r}-${c}`} className={cellClasses}>
                <Cell
                  value={userBoard[r][c]}
                  isInitial={puzzle[r][c] !== 0}
                  isSelected={isSelected}
                  isSameRow={isSameRow}
                  isSameCol={isSameCol}
                  isSameBox={isSameBox}
                  isSameNumber={isSameNumber}
                  isError={errors[r][c]}
                  memos={memos[r][c]}
                  onClick={() => onCellClick(r, c)}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
