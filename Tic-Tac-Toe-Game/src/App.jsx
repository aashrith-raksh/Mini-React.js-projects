import { useCallback, useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS as combinations } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    'X': "Player 1",
    'O': "Player 2",
  });

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = INITIAL_BOARD.map((innerArray) => [...innerArray]);
  let winner = null;
  const draw = gameTurns.length == 9 && !winner;

  // let gameBoard = [...INITIAL_BOARD.map(innerArray => [...innerArray])];

  for (const turn of gameTurns) {
    // console.log('turn:', turn)
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of combinations) {
    // console.log(combination)

    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const handleSelectSquare = useCallback((rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      let currentPlayer = deriveActivePlayer(prevGameTurns);

      const updatedGameTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  });

  const restartGame = useCallback(() => setGameTurns([]));
  const handlePlayerNameChange = useCallback((symbol, newPlayerName) => {
    setPlayers((prevPlayers) => ({ ...prevPlayers, [symbol]: newPlayerName }));
  });

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onPlayerNameChange = {handlePlayerNameChange}
          />
          <Player
            initialName={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onPlayerNameChange = {handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={players[winner]} handleClick={restartGame} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
