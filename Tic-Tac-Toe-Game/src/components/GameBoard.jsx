import { useState } from "react";

const BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
    const [initialGameBoard,setInitialGameBoard] = useState(BOARD);


    function handleClick(rowIndex, colIndex){
        console.log("rowIndex: " + rowIndex)
        console.log("colIndex: " + colIndex)
        setInitialGameBoard((prevBoard) => {
            const colCopy = prevBoard.map(row => [...row]);
            const updatedBoard = [...colCopy];

            updatedBoard[rowIndex][colIndex] = 'X';

            return updatedBoard;
        })
    }
  return (
    <ol id="game-board">
      {initialGameBoard.map((row, rowIndex) => {
         return <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
               return <li key={colIndex}>
                <button onClick={() => handleClick(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>;
            })}
          </ol>
        </li>;
      })}
    </ol>
  );
}
