import React, { useState } from 'react';

const Actions = ({ gameState, hit, stand, split, disableBetPlaced }) => {
    const [disableButtons, setDisableButtons] = useState(false);

    const handleHit = async () => {
        if (gameState === 'playing' && !disableButtons) {
            hit();
            setDisableButtons(true);
            disableBetPlaced();
            setTimeout(() => setDisableButtons(false), 1000);
        }
    }

    const handleStand = async () => {
        if (gameState === 'playing' && !disableButtons) {
            stand();
            setDisableButtons(true);
            disableBetPlaced();
            setTimeout(() => setDisableButtons(false), 750);
        }
    }

    const handleSplit = async () => {
        if (gameState === 'split' && !disableButtons) {
            split();
            setDisableButtons(true);
            disableBetPlaced();
            setTimeout(() => setDisableButtons(false), 750);
        }
    }

    return (
        <div className="">
            <div className="">
                <div className="actions">
                    {gameState === 'split' && <button className="" onClick={handleSplit} disabled={disableButtons}>Split</button>}
                    <button className="" onClick={handleHit} disabled={disableButtons}>Hit</button>
                    <button className="" onClick={handleStand} disabled={disableButtons}>Stand</button>
                </div>
            </div>
        </div>
    );
}

export default Actions;

