import React from 'react';
import GameStatusOverlay from './GameStatusOverlay';

const GameOverlay = ({ gameState, restartGame, playerHand, dealerHand, calculateHandValue, currentBet, setBalance }) => {
    return (
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
                            currentBet={currentBet}
                            setBalance={setBalance}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameOverlay;