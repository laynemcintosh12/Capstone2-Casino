import React from 'react';

const Betting = ({ betAmount, handleChange, handleStart, gameState, betting, currentBet, setCurrentBet, betPlaced, setBetPlaced }) => {

    const handleBetting = () => {
        betting(betAmount);
        let betTotal = parseInt(currentBet) + parseInt(betAmount); 
        setCurrentBet(betTotal);
        setBetPlaced(true);
    }

    return (
        <div className="">
            <div className="">
                <div>
                    {gameState === 'playing' && <p>Current Bet: {currentBet}</p>}
                </div>
                <label htmlFor='bet-input'>Bet</label>
                <input id='bet-input' className="" type="number" value={betAmount} onChange={handleChange} step="10" />
                <div>
                    {gameState === 'start' && <button className="" onClick={handleStart}>Start Game</button>}
                    {gameState === 'playing' && (
                        <>
                        <button className="" onClick={handleBetting} disabled={betPlaced}>Place Bet</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Betting;
