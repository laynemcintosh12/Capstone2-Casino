import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TriviaQuestion from './TriviaQuestion';
import TriviaResult from './TriviaResult';
import CasinoAPI from '../../api';
import { jwtDecode } from 'jwt-decode';

const Trivia = ({ setBalance }) => {
  const [triviaQuestions, setTriviaQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);


    // Make api call to trivia api to get 10 questions
    async function getTriviaData() {
        setLoading(true);

        const resp = await axios.get("https://opentdb.com/api.php?amount=10&category=9&type=boolean");

        setTriviaQuestions([...resp.data.results]);
        setLoading(false);
    }

    useEffect(() => {
        getTriviaData();
    }, []);

    function verifyAnswer(answer) {
        const currentQuestion = triviaQuestions[currentQuestionIndex];
        if (currentQuestion.correct_answer === answer) {
          setCurrentPoints(currentPoints + 1);
        }
        if (currentQuestionIndex < triviaQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          endGame();
        }
    }

    function endGame() {
        setGameEnded(true);
        // give winnings to user based off their currentPoints
        let token = localStorage.getItem("token");
        let decoded = jwtDecode(token);
        let winnings = currentPoints * 1000;
        CasinoAPI.giveWinnings(decoded.username, winnings);
        // set new balance
        let currentBalance = localStorage.getItem("balance");
        let newBalance = parseInt(currentBalance) + winnings;
        localStorage.setItem("balance", newBalance);
        setBalance(newBalance);
    }

    function resetGame() {
        setGameEnded(false);
        setCurrentQuestionIndex(0);
        setCurrentPoints(0);
        getTriviaData();
    }

    //Converts html code to regular characters
    function removeCharacters(question) {
        return question.replace(/(&quot;)/g, '"').replace(/(&rsquo;)/g, "'").replace(/(&#039;)/g, "'").replace(/(&amp;)/g, "&");
    }

    return (
        <div className="container mt-5">
          <div className="card bg-dark text-light p-4 rounded">
            <div className="card-body text-center">
              {loading ? (
                "Trivia Question Loading..."
              ) : gameEnded ? (
                <TriviaResult totalPoints={currentPoints} resetGame={resetGame} />
              ) : (
                <div>
                  <div>
                    <h2 className="card-title">Trivia</h2>
                    <h5 className="card-title">Current Points: {currentPoints}</h5>
                    <h6 className="card-title">For each point you receive, you will gain 1000 coins</h6>
                  </div>
                  <br />
                  {triviaQuestions.length > 0 &&
                    currentQuestionIndex < triviaQuestions.length && (
                      <TriviaQuestion
                        questionData={triviaQuestions[currentQuestionIndex]}
                        removeCharacters={removeCharacters}
                        verifyAnswer={verifyAnswer}
                      />
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
}

export default Trivia;
