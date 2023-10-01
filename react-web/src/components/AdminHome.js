import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component

function AdminHome() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/quizzes')
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Admin Home</h1>
      <h2>Existing Quizzes:</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <p>Title: {quiz.title}</p>
            <p>Quiz Code: {quiz.quizCode}</p>
            {/* Use Link to navigate to the Quiz component */}
            <Link to={`/quiz/${quiz.id}`}>Start</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminHome;
