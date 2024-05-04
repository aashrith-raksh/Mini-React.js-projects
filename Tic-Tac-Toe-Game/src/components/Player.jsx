import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlayerName, setcCurrentPlayerName] = useState(initialName);
  let editablePlayerName = (
    <span className="player-name">{currentPlayerName}</span>
  );

  if (isEditing) {
    editablePlayerName = (
      <input
        required
        value={currentPlayerName}
        onChange={handleInputChage}
      ></input>
    );
  }

  function handleInputChage(e) {
    let userInput = e.target.value;
    setcCurrentPlayerName(userInput);
  }

  return (
    <li className={isActive ? "active": undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-logo">{symbol}</span>
      </span>
      <button onClick={() => setIsEditing((prev) => !prev)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
