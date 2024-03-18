import React from 'react';
import Actions from './Actions';
import Betting from './Betting';

const Header = ({ gameState, hit, stand, split, disableBetPlaced, betAmount, handleChange, handleStart, betting, balance, currentBet, setCurrentBet, betPlaced, setBetPlaced }) => (
  <div className="text-center text-light mb-4 pt-4" style={{ maxWidth: '65%', maxHeight: '2%', margin: '0 auto' }}>
    <div className="bg-dark rounded p-4">
      <h1>Blackjack</h1>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {gameState==="playing" ? (
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="container-fluid border border-dark rounded p-3">
                    <Actions
                      gameState={gameState}
                      hit={hit}
                      stand={stand}
                      split={split}
                      disableBetPlaced={disableBetPlaced}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="container-fluid border border-dark rounded p-3">
                    <Betting
                      betAmount={betAmount}
                      handleChange={handleChange}
                      handleStart={handleStart}
                      betting={betting}
                      balance={balance}
                      gameState={gameState}
                      currentBet={currentBet}
                      setCurrentBet={setCurrentBet}
                      betPlaced={betPlaced}
                      setBetPlaced={setBetPlaced}
                    />
                  </div>
                </div>
              </div>
            ) : ( 
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="container-fluid border border-dark rounded p-3">
                    <Betting
                      betAmount={betAmount}
                      handleChange={handleChange}
                      handleStart={handleStart}
                      betting={betting}
                      balance={balance}
                      gameState={gameState}
                      currentBet={currentBet}
                      setCurrentBet={setCurrentBet}
                      betPlaced={betPlaced}
                      setBetPlaced={setBetPlaced}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
