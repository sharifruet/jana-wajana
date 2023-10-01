import React, { useState } from 'react';

function JoinQuiz() {
  const [quizCode, setQuizCode] = useState('');

  const handleJoin = () => {
    // Implement logic to join the quiz using the quiz code
  };

  return (
    <div>
      <h1>Join Quiz</h1>
      <input
        type="text"
        placeholder="Enter Quiz Code"
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join Quiz</button>
    </div>
  );
}

export default JoinQuiz;
