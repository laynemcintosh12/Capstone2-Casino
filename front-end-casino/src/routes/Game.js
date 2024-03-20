import React, { useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";

function Game({ game, background, classProp }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const getBackgroundImage = (gameName) => {
    switch (gameName) {
      case "Blackjack":
        return "url('https://media.gettyimages.com/id/118383426/photo/ace-king.jpg?s=612x612&w=0&k=20&c=03RPhTIvs1huJnNssDtyns-ReKcvXpp91pcaU6pCveM=')";
      case "Poker":
        return "url('https://cdn.pixabay.com/photo/2022/06/13/22/32/casino-7260767_1280.jpg')";
      case "Roulette":
        return "url('https://cdn.pixabay.com/photo/2017/01/22/22/02/gambling-2001079_1280.jpg')";
      case "none":
        return;
      default:
        return "none";
    }
  };

  const backgroundImage = getBackgroundImage(background);

  function handleClick() {
      navigate(`/${game.gameName}`);
  }

  return (
    <div
      className={`game-${classProp}`}
      style={{
        backgroundImage: backgroundImage,
        height: "94.4vh",
        opacity: hovered ? 0.7 : 1, 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick} 
    >
      {hovered && (
        <div className={`game-name-${classProp}`}>
          <h2 className="text-center text-light text-shadow bg-dark rounded p-3">
            {game.gameName}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Game;

