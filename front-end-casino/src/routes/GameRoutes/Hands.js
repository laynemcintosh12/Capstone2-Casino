import React from 'react';
import Card from './Card';

const Hand = ({ hand, calculateHandValue, title }) => {
    return (
        <div className="row">
            <div className="col">
                <div className="player-hand">
                    <h2 className='text-center text-light'>{title}: <span id="player-hand-total">{calculateHandValue(hand)}</span></h2>
                    <div className="card-area">
                        {hand.map((cardData) => (
                            <Card key={cardData.id} front={cardData.image} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hand;
