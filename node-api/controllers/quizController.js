// controllers/quizController.js

const Quiz = require('../models/quiz');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, quizCode, questions } = req.body;
    const quiz = await Quiz.create({ title, quizCode, questions });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Error creating quiz' });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quizzes' });
  }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quiz' });
  }
};

// Update a quiz by ID
exports.updateQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, quizCode, questions } = req.body;
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    quiz.title = title;
    quiz.quizCode = quizCode;
    quiz.questions = questions;
    await quiz.save();
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Error updating quiz' });
  }
};

// Delete a quiz by ID
exports.deleteQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByPk(id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    await quiz.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting quiz' });
  }
};
