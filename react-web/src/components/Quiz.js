import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

function Quiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [showLoadingText, setShowLoadingText] = useState(false);
  const [showResultsText, setShowResultsText] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/quizzes/${quizId}`)
      .then((response) => {
        setQuiz(response.data);
        setCurrentQuestionIndex(null);
        setShowLoadingText(false);
        setShowResultsText(false);
      })
      .catch((error) => {
        console.error('Error fetching quiz details:', error);
      });
  }, [quizId]);

  const startQuiz = () => {
    setCurrentQuestionIndex(-1); // Start from the first question
    loadNextQuestion();
  };

  const loadNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length) {
      // Load the next question after 5 seconds
      setTimeout(() => {
        
        setShowLoadingText(true);

        // Show "loading next question" for 3 seconds
        setTimeout(() => {
          setShowLoadingText(false);

          // Load the next question
          loadNextQuestion();
        }, 3000);
      }, 5000);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // All questions have been shown, show results after 3 seconds
      setShowLoadingText(true);

      setTimeout(() => {
        setShowResultsText(true);
      }, 3000);
    }
  };

  if (!quiz) {
    return <p>Loading quiz details...</p>;
  }

  return (
    <div>
      <h2>Quiz: {quiz.title}</h2>
      <div>
        {currentQuestionIndex === null && (
          <>
            <QRCode value={`http://localhost:3000/quiz/${quizId}`} />
            <p>Quiz Code: {quizId}</p>
            <button onClick={startQuiz}>Start</button>
          </>
        )}
      </div>
      {currentQuestionIndex !== null && (
        <div>
          {showResultsText ? (
            <p>Here is the result</p>
          ) : currentQuestionIndex < quiz.questions.length ? (
            <div>
              <h3>Question {currentQuestionIndex + 1}</h3>
              {showLoadingText ? (
                <p>Loading next question...</p>
              ) 
              : (
                <p>{quiz.questions[currentQuestionIndex].questionText}</p>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Quiz;
