import React from "react";
import Game from "./Game";
import '../styles/home.css';

function Home({ games }) {
  return (
    <div className="home">
        <div className="row no-gutters">
          <div className="header-container">
            <h1 className="header-text">Welcome to McIntosh Casino</h1>
          </div>
          {games.map((game, index) => (
              <span key={index} className="col game-span"><Game game={game} background={game.gameName} classProp="home"/></span>
          ))}
        </div>
    </div>
  );
}

export default Home;
