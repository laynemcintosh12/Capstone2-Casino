import React, { useState, useEffect } from 'react';

const TriviaQuestion = ({ questionData, index, removeCharacters, verifyAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setSelectedAnswer(null); // Reset the selected answer when a new question is rendered
  }, [questionData]);

  const addToAnswers = (answer) => {
    setSelectedAnswer(answer);
    verifyAnswer(answer);
  };

  return (
    <div className="mb-3 p-3 rounded" style={{ backgroundColor: 'slategrey' }}>
      <h5>{removeCharacters(questionData.question)}</h5>
      <div className="d-flex justify-content-center">
        <button
          className={`btn btn-primary mx-2 ${selectedAnswer === 'True' ? 'active' : ''}`}
          onClick={() => addToAnswers('True')}
        >
          True
        </button>
        <button
          className={`btn btn-danger mx-2 ${selectedAnswer === 'False' ? 'active' : ''}`}
          onClick={() => addToAnswers('False')}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default TriviaQuestion;