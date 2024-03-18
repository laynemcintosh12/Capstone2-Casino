import React from "react";

const Actions = ({ game }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white p-3 rounded">
            <h3 className="text-center">Current Bet: {game.currentBet}</h3>
            <div className="row justify-content-center">
              <button className="btn btn-primary mr-2" onClick={() => game.hit()}>Hit</button>
              <button className="btn btn-primary mr-2" onClick={() => game.stand()}>Stand</button>
              <button className="btn btn-secondary mr-2" onClick={() => game.doubleBet()}>Double Bet</button>
              <button className="btn btn-secondary" onClick={() => game.tripleBet()}>Triple Bet</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;

