import React, { useState } from 'react';
import Card from "./Card";
import '../../styles/Blackjack.css'
import GameStatusOverlay from './GameStatusOverlay'
import useBlackjackGame from '../../hooks/useBlackjackGame';
import CasinoApi from '../../api';
import { jwtDecode } from 'jwt-decode';


const BlackjackGame = () => {
    const [formData, setFormData] = useState({
        betAmount: 0,
      });

    const { 
      playerHand,
      splitHand, 
      dealerHand, 
      gameState, 
      startNewGame, 
      hit, 
      stand, 
      restartGame,
      calculateHandValue,
      split,
    } = useBlackjackGame();

    const betting = (amt) => {
        // get user
        const token = localStorage.getItem('token');
        const username = jwtDecode(token).username;
        // place bet
        CasinoApi.placeBet(username, amt);

    }

    const handleStart = async (e) => {
        e.preventDefault();
        startNewGame();
        betting(formData.betAmount);
    }

    const handleChange = (e) => {
        const { amount } = e.target;
        setFormData(data => ({
            ...data,
            betAmount: amount
        }));
    };

    return (
      <div className="container-fluid mt-4">
          <div className="text-center text-light mb-4 pt-4">
              <h1>Blackjack</h1>
          </div>

        {gameState === 'start' && (
          <div className="row">
              <div className="col text-center mt-4">
                <form className="form" onSubmit={handleStart}>
                    <label className="text-light" htmlFor='bet-input'>Bet:</label>
                        <input id='bet-input' className="bet-input" type="number" value={formData.betAmount} onChange={handleChange} />
                    <button className="btn btn-dark btn-lg">Start Game</button>
                </form>
              </div>
          </div>
        )}

        {gameState === 'playing' && (
            <>
            <div className="row mt-4">
                <div className="col text-center mb-4">
                    <div className="actions">
                        {gameState === 'split' && <button className="btn btn-dark mr-2" onClick={split}>Split</button>}
                        <button className="btn btn-dark mr-2" onClick={hit}>Hit</button>
                        <button className="btn btn-dark" onClick={stand}>Stand</button>
                        
                    </div>
                </div>
            </div>
            
            <div className="row">
                 <div className="col">
                    <div className="dealer-hand">
                        <h2 className='text-center text-light'>Dealer Hand: <span id="dealer-hand-total">{calculateHandValue(dealerHand)}</span></h2>
                        <div className="card-area">
                            {dealerHand.map((cardData) => (
                                <Card key={cardData.id} front={cardData.image} />
                            ))}
                        </div>
                    </div>
                 </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="player-hand">
                        <h2 className='text-center text-light'>Player Hand: <span id="player-hand-total">{calculateHandValue(playerHand)}</span></h2>
                        <div className="card-area">
                            {playerHand.map((cardData) => (
                                <Card key={cardData.id} front={cardData.image} />
                            ))}
                        </div>
                    </div>
                </div>
                
                {splitHand.length > 0 && (
                    <div className="col">
                        <div className="split-hand">
                            <h2 className='text-center text-light'>Split Hand: <span id="split-hand-total">{calculateHandValue(splitHand)}</span></h2>
                            <div className="card-area">
                                {splitHand.map((cardData) => (
                                    <Card key={cardData.id} front={cardData.image} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
            </>
        )}

        <div className="row mt-4">
          <div className="col text-center">
            <div className="game-overlay">
              {gameState !== 'playing' && gameState !== 'start' && (
                <GameStatusOverlay
                  gameState={gameState}
                  restartGame={restartGame}
                  total={{
                    player: calculateHandValue(playerHand),
                    dealer: calculateHandValue(dealerHand)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

    );
};

export default BlackjackGame;



