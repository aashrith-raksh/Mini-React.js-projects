import { useState } from "react";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare, turns}) {
    // const [initialGameBoard,setInitialGameBoard] = useState(BOARD);


    // function handleClick(rowIndex, colIndex){
    //     console.log("rowIndex: " + rowIndex)
    //     console.log("colIndex: " + colIndex)
    //     setInitialGameBoard((prevBoard) => {
    //         const colCopy = prevBoard.map(row => [...row]);
    //         const updatedBoard = [...colCopy];

    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;

    //         return updatedBoard;
    //     })

    //     onSelectSquare(activePlayerSymbol)
    // }

    let gameBoard = INITIAL_BOARD;
    
    for(const turn of turns){
      // console.log('turn:', turn)
      const {square, player} = turn;
      const {row, col}= square;

      gameBoard[row][col] = player;
    }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
         return <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
               return (
                 <li key={colIndex}>
                   <button
                     onClick={() => onSelectSquare(rowIndex, colIndex)}
                     disabled={playerSymbol != null}
                   >
                     {playerSymbol}
                   </button>
                 </li>
               );
            })}
          </ol>
        </li>;
      })}
    </ol>
  );
}
