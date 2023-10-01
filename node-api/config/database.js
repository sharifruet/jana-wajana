// config/database.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('quiz', 'root', 'toor', {
  host: 'localhost',
  dialect: 'mysql', // Use 'mysql' as the dialect for MySQL
  define: {
    timestamps: false, // Disable timestamps for all models by default
  },
});

module.exports = sequelize;
