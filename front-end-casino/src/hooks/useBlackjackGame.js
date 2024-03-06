import { useState, useEffect } from 'react';
import { Shuffle, drawCard } from '../DeckOfCardsAPI';


const useBlackjackGame = () => {
  const [deckId, setDeckId] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [splitHand, setSplitHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameState] = useState('start');
  
  const startNewGame = async () => {
    try {
      const data = await Shuffle(1);
      setDeckId(data.data.deck_id);
      setGameState('playing');
    } catch (error) {
      console.error('Error starting new game:', error);
    }
  };

  useEffect(() => {
    const dealCards = async () => {
      try {
        if (deckId) {
          const playerCard1 = await drawCard(deckId);
          const playerCard2 = await drawCard(deckId);
          const dealerCard1 = await drawCard(deckId);
          const dealerCard2 = await drawCard(deckId);
          
          setPlayerHand([playerCard1.data.cards[0], playerCard2.data.cards[0]]);
          setDealerHand([dealerCard1.data.cards[0], dealerCard2.data.cards[0]]);

          // Check for splitting possibility
          if (playerCard1.data.cards[0].value === playerCard2.data.cards[0].value) {
            setGameState('split');
          }
        }
      } catch (error) {
        console.error('Error dealing cards:', error);
      }
    };

    dealCards();
  }, [deckId]);

  // splits players current hand into two seperate hands
  const split = async () => {
    const card1 = playerHand[0];
    const card2 = playerHand[1];
    const newCard1 = await drawCard(deckId);
    const newCard2 = await drawCard(deckId);
    setPlayerHand([card1, newCard2.data.cards[0]]);
    setSplitHand([newCard1.data.cards[0], card2]);
    setGameState('playing');
  }

  const hit = async () => {
    try {
      const newPlayerCard = await drawCard(deckId);
      const val = newPlayerCard.data.cards[0];
      setPlayerHand([...playerHand, val]);
      if (isBust([...playerHand, val])) {
        setGameState('playerBust');
      }
    } catch (error) {
      console.error('Error drawing card:', error);
    }
  };

  const stand = async () => {
    if (gameState === 'playing') {
      try {
        let dealerValue = calculateHandValue(dealerHand);
        while (dealerValue < 17) {
          
          const newDealerCard = await drawCard(deckId);
          const val = newDealerCard.data.cards[0];
            setDealerHand([...dealerHand, val]);
            if (isBust([...dealerHand, val])) {
              setGameState('dealerBust');
              return;
            }
            
          dealerValue = setTimeout(() => {
            console.log("timeout")
            return calculateHandValue([...dealerHand, val]);
          }, 2000);

          
        }
        const playerValue = calculateHandValue(playerHand);
        dealerValue = calculateHandValue(dealerHand);
        if (playerValue > dealerValue) {
          setGameState('playerWin');
        } else if (dealerValue > playerValue) {
          setGameState('dealerWin');
        } else {
          setGameState('draw');
        }
      } catch (error) {
        console.error('Error drawing card for dealer:', error);
      }
    }
  };

  const calculateHandValue = hand => {
    let sum = 0;
    let hasAce = false;

      for (const card of hand) {
        if (card.value === 'ACE') {
          hasAce = true;
        }
        if (['JACK', 'QUEEN', 'KING'].includes(card.value)) {
          sum += 10;
        } else if (card.value !== 'ACE') {
          sum += parseInt(card.value);
        }
      }
  
      if (hasAce) {
        if (sum + 11 <= 21) {
          sum += 11;
        } else {
          sum += 1;
        }
      }


    return sum;
  };

  const isBust = hand => {
    return calculateHandValue(hand) > 21;  
  };

  const restartGame = () => {
    setDeckId(null);
    setPlayerHand([]);
    setDealerHand([]);
    startNewGame();
  };

  return { 
    playerHand,
    splitHand,
    dealerHand, 
    gameState, 
    startNewGame, 
    hit, 
    stand, 
    restartGame, 
    calculateHandValue, 
    isBust,
    split
  };
};

export default useBlackjackGame;
