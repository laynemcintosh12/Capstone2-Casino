import React, { useState } from "react";
import "../../styles/Card.css"

const backOfCard = "https://deckofcardsapi.com/static/img/back.png";


function Card({ cardData }) {
  const [isFacingUp, setIsFacingUp] = useState(true);

  // if(cardData.isFaceDown){
  //   setIsFacingUp(false);
  // }
  
  return (
    <img
      src={isFacingUp ? cardData.image : backOfCard}
      alt="playing card"
      className="PlayingCard-Card"
    />
  );
}

export default Card;