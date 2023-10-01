import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';

function Quiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showNextQuestionText, setShowNextQuestionText] = useState(false);
  const [showResultsText, setShowResultsText] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/quizzes/${quizId}`)
      .then((response) => {
        setQuiz(response.data);
        setCurrentQuestionIndex(-1);
        setShowNextQuestionText(false);
        setShowResultsText(false);
      })
      .catch((error) => {
        console.error('Error fetching quiz details:', error);
      });
  }, [quizId]);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    // Start loading questions sequentially with intervals
    const timer = setInterval(() => {
      if (currentQuestionIndex < quiz.questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setShowNextQuestionText(false);

        if (currentQuestionIndex === quiz.questions.length - 1) {
          // All questions have been shown, show results after 3 seconds
          clearInterval(timer);
          setTimeout(() => {
            setShowResultsText(true);
          }, 3000);
        } else {
          // Show "loading next question" after 5 seconds
          setTimeout(() => {
            setShowNextQuestionText(true);
          }, 5000);
        }
      } else {
        // All questions have been shown, stop the timer
        clearInterval(timer);
      }
    }, 8000); // Change this interval as needed (5 seconds question + 3 seconds text)
  };

  if (!quiz) {
    return <p>Loading quiz details...</p>;
  }

  const question = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h2>Quiz: {quiz.title}</h2>
      <h4>{currentQuestionIndex}</h4>
      <div>
        
        {currentQuestionIndex < 0 && (
          <>
            <QRCode value={`http://localhost:3000/quiz/${quizId}`} />
            <p>Quiz Code: {quizId}</p>
            <button onClick={startQuiz}>Start</button>
          </>
        )}
      </div>
      {currentQuestionIndex >=0 && (
        <div>
          <h3>Question {currentQuestionIndex + 1}</h3>
          {!showNextQuestionText && !showResultsText && <p>{question?.questionText}</p>}
          {showNextQuestionText && <p>Loading next question...</p>}
          {showResultsText && <p>Results here</p>}
        </div>
      )}
      {showResultsText && (
        <div>
          <p>Result</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
