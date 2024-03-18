import React, { useEffect, useState } from "react";
import Hand from './Hand';
import Actions from './Actions';

const BlackjackPlaying = ({ game, setGameState, setBalance }) => {
    const [cardsDealt, setCardsDealt] = useState(false);

    useEffect(() => {
        const deal = async () => {
            await game.dealCards();
            setCardsDealt(true);
            setGameState(game.gameState);
        };
        deal();
    }, [game.playerHand, game.dealerHand, game, setGameState]); 

    return (
        <div>
            <div className="actions-container">
                <Actions game={game} setBalance={setBalance} />
            </div>
            {cardsDealt && ( 
                <div className="hand-container">
                    <Hand hand={game.playerHand} total={game.playerHandTotal} name="Player Hand" />
                    <Hand hand={game.dealerHand} total={game.dealerHandTotal} name="Dealer Hand" />
                </div>
            )}
        </div>
    )
}

export default BlackjackPlaying;
