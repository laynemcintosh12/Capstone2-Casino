import React, { useEffect, useState, useCallback } from "react";
import Hand from './Hand';
import Actions from './Actions';

const BlackjackPlaying = ({ game, setGameState, setBalance }) => {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);

  const updatePlayerHand = useCallback(() => {
    setPlayerHand([...game.playerHand]);
  }, [game.playerHand]);

  const updateDealerHand = useCallback(() => {
    setDealerHand([...game.dealerHand]);
  }, [game.dealerHand]);

  useEffect(() => {
    const deal = async () => {
      await game.dealCards();
      updatePlayerHand();
      updateDealerHand();
      setGameState(game.gameState);
    };
    deal();
  }, [game, setGameState, updatePlayerHand, updateDealerHand]);

  useEffect(() => {
    updatePlayerHand();
    updateDealerHand();
  }, [game.playerHand, game.dealerHand, updatePlayerHand, updateDealerHand]);

  return (
    <div>
      <div className="actions-container">
        <Actions game={game} setBalance={setBalance} updatePlayerHand={updatePlayerHand} updateDealerHand={updateDealerHand} setGameState={setGameState} />
      </div>
      <div className="hand-container">
        <Hand hand={playerHand} total={game.playerHandTotal} name="Player Hand" />
        <Hand hand={dealerHand} total={game.dealerHandTotal} name="Dealer Hand" />
      </div>
    </div>
  );
};

export default BlackjackPlaying;