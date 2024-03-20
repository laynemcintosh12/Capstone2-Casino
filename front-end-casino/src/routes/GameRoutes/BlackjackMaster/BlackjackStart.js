import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

const BlackjackStart = ({ game, setGameState, setBalance }) => {
    const [currentBet, setCurrentBet] = useState(game.currentBet);

    useEffect(() => {
        // Update currentBet state whenever game.currentBet changes
        setCurrentBet(game.currentBet);
        // Update balance state whenever game.balance changes
        setBalance(game.balance);
    }, [game.currentBet, game.balance, setBalance]); 

    const handleIncreaseBet = () => {
        const token = localStorage.getItem("token");
        const username = jwtDecode(token).username;
        game.increaseBet(5, username).then(() => {
            // After increasing bet, update currentBet state
            setCurrentBet(game.currentBet);
            // After increasing bet, update balance state
            setBalance(game.balance);
        });
    }

    const handleStart = async () => {
        await game.startGame();
        // After starting game, update gameState state
        setGameState(game.gameState);
        // After starting game, update balance state
        await game.getBalance();
        setBalance(game.balance);
    }

    return (
        <div className="d-flex justify-content-center"> 
            <div className="text-center bg-dark rounded p-4 mt-3" style={{ width: '50%' }}>
                <h6 className="text-white mb-4">Click the button to increase your starting bet by 5, each time you click it will increase!</h6>
                <button className="btn btn-primary btn-lg rounded-circle mb-4" style={{ width: '150px', height: '150px', fontSize: "xx-large" }} onClick={handleIncreaseBet}>{currentBet}</button>
                <button className="btn btn-success btn-block" onClick={handleStart}>Start</button>
            </div>
        </div>
    )
}

export default BlackjackStart;

