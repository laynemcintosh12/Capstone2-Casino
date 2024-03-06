import React, { useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";

function Game({ game, background, classProp, isAuthenticated }) {
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
    // if user authenticated, then redirect to the route for the game clicked on
    if (isAuthenticated) {
      navigate(`/${game.gameName}`);
    } else {
      // if user not authenticated, then redirect to the login page
      alert("You must be logged in to play this game!");
      navigate("/login");
    }
  }

  return (
    <div
      className={`game-${classProp}`}
      style={{
        backgroundImage: backgroundImage,
        opacity: hovered ? 0.7 : 1, // Set opacity when hovered
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick} // Attach onClick event to the div
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

