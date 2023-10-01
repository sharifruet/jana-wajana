import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // Example library for generating QR codes
import questionsData from '../js/questions.json'; // Import your question list JSON file
import axios from 'axios'; // Import Axios

function CreateQuiz() {
  // Generate a random 6-digit quiz code
  const generateQuizCode = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [quizCode, setQuizCode] = useState(generateQuizCode());
  const [quizTitle, setQuizTitle] = useState(''); // State for quiz title
  const quizUrl = `/quiz/${quizCode}`; // URL for others to join the quiz

  // Get a random subset of 10 questions from the question list
  const getRandomQuestions = () => {
    const shuffledQuestions = [...questionsData].sort(() => 0.5 - Math.random());
    return shuffledQuestions.slice(0, 10);
  };

  const [questions, setQuestions] = useState(getRandomQuestions());

  // Function to handle submitting the quiz data to the backend using Axios
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/quizzes', {
        title: quizTitle, // Use the user-provided quiz title
        quizCode: quizCode, // Use the generated quiz code
        questions: questions, // Use the array of questions
        // Include other quiz data as needed
      });

      if (response.status === 201) {
        // Quiz created successfully, you can handle success here (e.g., show a success message)
        console.log('Quiz created successfully');
      } else {
        // Quiz creation failed, handle error (e.g., show an error message)
        console.error('Error creating quiz');
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>

      {/* Input field for quiz title */}
      <input
        type="text"
        placeholder="Enter Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />

      {/* Display the quiz code */}
      <p>Quiz Code: {quizCode}</p>

      {/* Display the QR code */}
      <QRCode value={quizUrl} />

      {/* Display the list of random questions */}
      <div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            {/* Display the question text */}
            <p>Question {questionIndex + 1}: {question.questionText}</p>
            
            {/* Display options */}
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
            
            {/* Display the correct answer */}
            <p>Correct Answer: {question.options[question.correctAnswer]}</p>
          </div>
        ))}
      </div>

      {/* Additional form for creating quiz questions (if needed) */}
      {/* Add form elements for creating questions, options, and correct answers */}
      
      <button type="button" onClick={handleSubmit}>
        Create Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
