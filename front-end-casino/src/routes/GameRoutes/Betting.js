import React from 'react';

const Betting = ({ betAmount, handleChange, handleStart, gameState }) => {
    return (
        <div className="row">
            <div className="col text-center mt-4">
                <form className="form" onSubmit={handleStart}>
                    <label className="text-light" htmlFor='bet-input'>Bet:</label>
                    <input id='bet-input' className="bet-input" type="number" value={betAmount} onChange={handleChange} />
                    {gameState === 'start' && <button className="btn btn-dark btn-large">Start Game</button>}
                </form>
            </div>
        </div>
    );
}

export default Betting;
