import React from "react";
import Game from "./Game";
import "../styles/gameList.css";

function GameList({ games }) {
  return (
    <div>
      <h1 className="mb-4 mt-4 text-center">Our Games</h1>
      <ul className="list-group">
        {games.map((game, index) => (
          <li key={index} className="list-group-item">
            <Game game={game} background="none" classProp="list" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
