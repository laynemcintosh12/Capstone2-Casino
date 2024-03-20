import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlackjackEnd = ({ game, setGameState, setBalance }) => {
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const endGame = async () => {
      const endMsg = await game.endGame();
      setMessage(endMsg);
      await game.getBalance();
      setBalance(game.balance);
    };
    endGame();
  }, [game, setBalance]);

  const navHome = () => {
    navigate("/");
  };

  const handleRestart = () => {
    game.restartGame();
    setGameState(game.gameState);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white p-3">
            <h2 className="text-center mb-4">Game Over!</h2>
            <div className="final-scores">
              <h4>Final Scores:</h4>
              <p><strong>Player: {game.playerHandTotal}</strong></p>
              <p><strong>Dealer: {game.dealerHandTotal}</strong></p>
            </div>
            <div className="message">
              <p>{msg}</p>
            </div>
            <div className="buttons text-center mt-2 mb-2">
              <button
                className="btn btn-primary mr-3"
                onClick={handleRestart}
              >
                Play Again
              </button>
              <button className="btn btn-primary" onClick={navHome}>
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackjackEnd;

