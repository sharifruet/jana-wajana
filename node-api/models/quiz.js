// models/quiz.js

const Sequelize = require('sequelize');
const db = require('../config/database');

const Quiz = db.define('quiz', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quizCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  questions: {
    type: Sequelize.JSON, // Store questions as JSON data
    allowNull: false,
  },
  // Add more fields as needed for your quiz data
});

module.exports = Quiz;
