import React from 'react';
import { useNavigate } from 'react-router-dom';

const TriviaResult = ({ totalPoints, resetGame }) => {
  const navigate = useNavigate();

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="text-center">
      <h2>Game Over</h2>
      <h3>Total Points: {totalPoints}</h3>
      <p>You have earned {totalPoints * 1000} coins.</p>
      <button className="btn btn-primary mr-2" onClick={handlePlayAgain}>
        Play Again
      </button>
      <button className="btn btn-secondary" onClick={handleReturnHome}>
        Return Home
      </button>
    </div>
  );
};

export default TriviaResult;