const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database'); // Import your Sequelize database configuration
const routes = require('./routes');
const cors = require('cors'); 

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Start the server
db.sync({ force: false }) // Set force: true to drop and recreate tables (use with caution)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error syncing database:', error));
