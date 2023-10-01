// routes.js

const express = require('express');
const router = express.Router();
const quizController = require('./controllers/quizController');

// Create a new quiz
router.post('/quizzes', quizController.createQuiz);

// Get all quizzes
router.get('/quizzes', quizController.getAllQuizzes);

// Get a single quiz by ID
router.get('/quizzes/:id', quizController.getQuizById);

// Update a quiz by ID
router.put('/quizzes/:id', quizController.updateQuizById);

// Delete a quiz by ID
router.delete('/quizzes/:id', quizController.deleteQuizById);

module.exports = router;
