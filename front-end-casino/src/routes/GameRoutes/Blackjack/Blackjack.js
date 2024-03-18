import React, { useState } from 'react';
import Hands from '../Hands';
import GameOverlay from './GameOverlay';
import useBlackjackGame from '../../../hooks/useBlackjackGame';
import CasinoAPI from '../../../api';
import { jwtDecode } from 'jwt-decode';
import Header from './Header';

function Blackjack({ balance, setBalance }) {
    const [formData, setFormData] = useState({
        betAmount: 0,
    });

    const [currentBet, setCurrentBet] = useState(0);
    const [betPlaced, setBetPlaced] = useState(false);

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
            const res = await CasinoAPI.placeBet(decoded.username, amt);

            setBalance(res.user.balance)
        } catch (error) {
            console.error('Error placing bet:', error);
        }
    }

    const disableBetPlaced = () => {
        setBetPlaced(false);
    }

    const handleStart = async (e) => {
        e.preventDefault();
        if (formData.betAmount <= 0) {
            alert("Please place your bet before starting a new game.")
        } else {
            startNewGame();
            betting(formData.betAmount);
            setCurrentBet(formData.betAmount);
        }

    }

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData(data => ({
            ...data,
            betAmount: value
        }));
    };

    const handleRestart = () => {
        restartGame();
        setCurrentBet(0);
    }

    return (
    <>
        <div>
            <Header
                gameState={gameState}
                hit={hit}
                stand={stand}
                split={split}
                disableBetPlaced={disableBetPlaced}
                betAmount={formData.betAmount}
                handleChange={handleChange}
                handleStart={handleStart}
                betting={betting}
                balance={balance}
                currentBet={currentBet}
                setCurrentBet={setCurrentBet}
                betPlaced={betPlaced}
                setBetPlaced={setBetPlaced} />
        </div>

        {gameState === 'playing' && (
            <>
                <Hands
                    hand={dealerHand}
                    calculateHandValue={calculateHandValue}
                    title="Dealer Hand" />
                <Hands
                    hand={playerHand}
                    calculateHandValue={calculateHandValue}
                    title="Player Hand" />
                {splitHand && splitHand.length > 0 && (
                    <Hands
                        hand={splitHand}
                        calculateHandValue={calculateHandValue}
                        title="Split Hand" />
                )}
            </>
        )}

        <GameOverlay
            gameState={gameState}
            restartGame={handleRestart}
            playerHand={playerHand}
            dealerHand={dealerHand}
            calculateHandValue={calculateHandValue}
            currentBet={currentBet}
            setBalance={setBalance} />
    </>
    );
};

export default Blackjack;
