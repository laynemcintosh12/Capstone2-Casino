import React, { useEffect, useState } from 'react';
import '../../../styles/GameStatusOverlay.css'
import CasinoApi from '../../../api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const GameOverOverlay = ({ gameState, restartGame, total, currentBet, setBalance }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const updateWinnings = async () => {
    try {
      const username = localStorage.getItem("token");
      const decoded = jwtDecode(username);
      const winnings = currentBet * 2;
      const res = await CasinoApi.giveWinnings(decoded.username, winnings);
      setBalance(res.user.balance)
    } catch (error) {
      console.error('Error updating winnings:', error);
    }
  }

  const navHome = () => {
    navigate("/");
  }


  useEffect(() => {
    switch (gameState) {
      case 'playerBust':
        setMessage('Player busts! Dealer wins.');
        break;
      case 'dealerBust':
        setMessage(`Dealer busts! Player wins ${parseInt(currentBet) * 2} coins.`);
        break;
      case 'playerWin':
        setMessage(`Player wins! You have recieved ${parseInt(currentBet) * 2} coins.`);
        break;
      case 'dealerWin':
        setMessage('Dealer wins!');
        break;
      case 'draw':
        setMessage('It\'s a draw!');
        break;
      default:
        setMessage('');
    }
    if (gameState === 'playerWin' || gameState === 'dealerBust') {
      updateWinnings();
    }
    console.log(gameState);
    // eslint-disable-next-line
  }, [gameState, currentBet]);
  

  let playerMessage = "Player's hand total: " + total.player;
  let dealerMessage = "Dealer's hand total: " + total.dealer;

  return (
    <div className="gameStatusOverlay">
      <h2 className='text-light mt-3'>{message}</h2>
      <h4 className='text-light'>{playerMessage}</h4>
      <h4 className='text-light'>{dealerMessage}</h4>
      <button className="btn btn-dark mt-3" onClick={restartGame}>Restart Game</button>
      <button className="btn btn-dark mt-3" onClick={navHome}>Go Home</button>
    </div>
  );
};


export default GameOverOverlay;
