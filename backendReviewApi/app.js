// Import required modules and set up the Express application
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Parse JSON data from incoming requests
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reviews_db',
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Export the 'db' connection to make it accessible in other parts of the application
module.exports.db = db;

// Import and use routes defined in 'review.js'
const reviewRoutes = require('./review');
app.use('/', reviewRoutes);

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
