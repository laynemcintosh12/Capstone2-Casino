import React from 'react';
import '../../styles/GameStatusOverlay.css'

const GameOverOverlay = ({ gameState, restartGame, total }) => {
  let message;
  switch (gameState) {
    case 'playerBust':
      message = 'Player busts! Dealer wins.';
      break;
    case 'dealerBust':
      message = 'Dealer busts! Player wins.';
      break;
    case 'playerWin':
      message = 'Player wins!';
      break;
    case 'dealerWin':
      message = 'Dealer wins!';
      break;
    case 'draw':
      message = 'It\'s a draw!';
      break;
    default:
      message = '';
  }

  let playerMessage = "Player's hand total: " + total.player;
  let dealerMessage = "Dealer's hand total: " + total.dealer;
  return (
    <div className="gameStatusOverlay">
        <h2 className='text-light mt-3'>{message}</h2>
        <h4 className='text-light'>{playerMessage}</h4>
        <h4 className='text-light'>{dealerMessage}</h4>
        <button className="btn btn-dark mt-3" onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default GameOverOverlay;
