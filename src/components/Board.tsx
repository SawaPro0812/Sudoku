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
      <div className="sudoku-outer mx-auto">
        {/* 3x3 blocks */}
        {[0, 1, 2].map(blockRow =>
          [0, 1, 2].map(blockCol => (
            <div key={`${blockRow}-${blockCol}`} className="sudoku-block">
              {[0, 1, 2].map(cellRow =>
                [0, 1, 2].map(cellCol => {
                  const r = blockRow * 3 + cellRow;
                  const c = blockCol * 3 + cellCol;
                  const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
                  const isSameRow = selectedCell !== null && selectedCell[0] === r && !isSelected;
                  const isSameCol = selectedCell !== null && selectedCell[1] === c && !isSelected;
                  const isSameBox = selectedCell !== null &&
                    Math.floor(selectedCell[0] / 3) === blockRow &&
                    Math.floor(selectedCell[1] / 3) === blockCol &&
                    !isSelected;
                  const isSameNumber = selectedVal !== 0 && userBoard[r][c] === selectedVal && !isSelected;

                  return (
                    <div key={`${r}-${c}`} className="sudoku-cell">
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
          ))
        )}
      </div>
    </div>
  );
}
