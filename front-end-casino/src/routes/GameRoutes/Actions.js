import React from 'react';

const Actions = ({ gameState, hit, stand, split }) => {
    return (
        <div className="row mt-4">
            <div className="col text-center mb-4">
                <div className="actions">
                    {gameState === 'split' && <button className="btn btn-dark mr-2" onClick={split}>Split</button>}
                    <button className="btn btn-dark mr-2" onClick={hit}>Hit</button>
                    <button className="btn btn-dark" onClick={stand}>Stand</button>
                </div>
            </div>
        </div>
    );
}

export default Actions;
