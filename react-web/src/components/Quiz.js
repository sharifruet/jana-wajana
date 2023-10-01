import React from 'react';

function Quiz({ quizId, question, options, selectedOption, onSelectOption }) {
    return (
      <div>
        <h2>Quiz ID: {quizId}</h2> {/* Display the quizId here */}
        <h2>{question}</h2>
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => onSelectOption(index)}
              className={index === selectedOption ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default Quiz;
