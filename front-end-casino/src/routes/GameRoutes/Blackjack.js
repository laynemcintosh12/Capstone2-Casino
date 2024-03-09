import React, { useState } from 'react';
import Betting from './Betting';
import Actions from './Actions';
import Hands from './Hands';
import GameOverlay from './GameOverlay';
import useBlackjackGame from '../../hooks/useBlackjackGame';
import CasinoAPI from '../../api';
import useBalance from '../../hooks/useBalance';
import { jwtDecode } from 'jwt-decode';

const Blackjack = () => {
    const [formData, setFormData] = useState({
        betAmount: 0,
    });

    const { balance, updateBalance } = useBalance();


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

    const betting = async (amt) => {
        try {
            // Check if bet amount is valid
            if (amt <= 0) {
                throw new Error('Invalid bet amount');
            }

            // Check if bet amount exceeds available balance
            if (amt > balance) {
                throw new Error('Insufficient balance');
            }

            // Place bet
            const username = localStorage.getItem("token");
            const decoded = jwtDecode(username);
            await CasinoAPI.placeBet(decoded.username, amt);

            updateBalance();
        } catch (error) {
            console.error('Error placing bet:', error);
        }
    }

    const handleStart = async (e) => {
        e.preventDefault();
        startNewGame();
        betting(formData.betAmount);
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData(data => ({
            ...data,
            betAmount: value
        }));
    };

    return (
        <div className="container-fluid mt-4">
            <div className="text-center text-light mb-4 pt-4">
                <h1>Blackjack</h1>
            </div>

            <Betting
                betAmount={formData.betAmount}
                handleChange={handleChange}
                handleStart={handleStart}
                balance={balance}
                gameState={gameState}
            />

            {gameState === 'playing' && (
                <>
                    <Actions
                        gameState={gameState}
                        hit={hit}
                        stand={stand}
                        split={split}
                    />
                    <Hands
                        hand={dealerHand}
                        calculateHandValue={calculateHandValue}
                        title="Dealer Hand"
                    />
                    <Hands
                        hand={playerHand}
                        calculateHandValue={calculateHandValue}
                        title="Player Hand"
                    />
                    {splitHand && splitHand.length > 0 && (
                        <Hands
                            hand={splitHand}
                            calculateHandValue={calculateHandValue}
                            title="Split Hand"
                        />
                    )}
                </>
            )}

            <GameOverlay
                gameState={gameState}
                restartGame={restartGame}
                playerHand={playerHand}
                dealerHand={dealerHand}
                calculateHandValue={calculateHandValue}
            />
        </div>
    );
};

export default Blackjack;
