import React, { useState, useEffect } from "react";
import "../../styles/Card.css";

const backOfCard = "https://deckofcardsapi.com/static/img/back.png";

function Card({ cardData }) {
  // Determine initial state based on cardData
  const [isFacingUp, setIsFacingUp] = useState(!cardData.isFaceDown);

  useEffect(() => {
    setIsFacingUp(!cardData.isFaceDown);
  }, [cardData.isFaceDown]); // Watch for changes in cardData.isFaceDown

  return (
    <img
      src={isFacingUp ? cardData.image : backOfCard}
      alt="playing card"
      className="PlayingCard-Card"
    />
  );
}

export default Card;
