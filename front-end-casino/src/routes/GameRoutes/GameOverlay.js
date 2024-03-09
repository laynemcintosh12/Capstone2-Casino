import React from 'react';
import GameStatusOverlay from './GameStatusOverlay';

const GameOverlay = ({ gameState, restartGame, playerHand, dealerHand, calculateHandValue }) => {
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
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameOverlay;