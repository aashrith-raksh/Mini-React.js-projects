export default function GameOver({winner, handleClick}) {
  return (
    <div id="game-over">
      <h1>Game Over</h1>
      {winner && <p>winner is {winner}</p>}
      {!winner && <p>It's a draw</p>}
      
      <p>
        <button onClick={() => handleClick()}>Rematch</button>
      </p>
    </div>
  );
}
