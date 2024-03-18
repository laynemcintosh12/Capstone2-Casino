import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlackjackEnd = ({ game }) => {
  const [msg, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setMessage(game.endGame());
  }, [game]);

  const navHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white p-3">
            <h2 className="text-center">Game Has Ended!</h2>
            <h3>Final Score:</h3>
            <h3>Player: {game.playerHandTotal}</h3>
            <h3>Dealer: {game.dealerHandTotal}</h3>
            <div>
              <p>{msg}</p>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary mr-2"
                onClick={() => game.restartGame()}
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
