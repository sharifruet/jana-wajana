import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [quizCode, setQuizCode] = useState('');

  // Function to handle joining a quiz with the entered code
  const handleJoinQuiz = () => {
    // Implement logic to join the quiz with the entered code
    // You can navigate to the quiz using React Router based on the entered code
    // For example: history.push(`/quiz/${quizCode}`)
  };

  return (
    <div>
      <h1>Welcome to Jana-Wajana</h1>
      
      {/* Input field for entering quiz code */}
      <input
        type="text"
        placeholder="Enter Quiz Code"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
      />
      
      {/* Join button */}
      <button onClick={handleJoinQuiz}>Join</button>
        <br/><br/>
      {/* Link to create a new quiz */}
      <Link to="/create-quiz"> Create a New Quiz </Link>
    </div>
  );
}

export default Home;
