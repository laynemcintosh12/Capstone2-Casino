import React from "react";
import "../../styles/Card.css"
import useFlip from "../../hooks/useFlip";

const backOfCard = "https://deckofcardsapi.com/static/img/back.png";


function Card({ front, back = backOfCard }) {
  const [isFacingUp, flipCard] = useFlip(true);
  
  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={flipCard}
      className="PlayingCard-Card"
    />
  );
}

export default Card;