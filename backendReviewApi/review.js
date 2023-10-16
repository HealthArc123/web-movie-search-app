// Import the Express.js framework and create a router
const express = require('express');
const router = express.Router();

// Import the 'db' object from an external module (assumed to be defined in './app')
const { db } = require('./app');

// Create a new review
router.post('/reviews', (req, res) => {
  // Extract data from the request body
  const { product_id, author, text, rating } = req.body;
  
  // Define the SQL query to insert a new review into a database
  const sql = 'INSERT INTO reviews (product_id, author, text, rating) VALUES (?, ?, ?, ?)';
  
  // Execute the SQL query with the provided data
  db.query(sql, [product_id, author, text, rating], (err, result) => {
    if (err) {
      console.error('Error creating a review: ' + err.message);
      res.status(500).json({ error: 'Failed to create a review' });
      return;
    }
    res.status(201).json({ message: 'Review created', reviewId: result.insertId });
  });
});

// Read all reviews for a specific product
router.get('/reviews/:product_id', (req, res) => {
  // Extract the 'product_id' parameter from the request URL
  const productId = req.params.product_id;
  
  // Define the SQL query to retrieve all reviews for a specific product
  const sql = 'SELECT * FROM reviews WHERE product_id = ?';
  
  // Execute the SQL query with the provided 'productId'
  db.query(sql, [productId], (err, results) => {
    if (err) {
      console.error('Error reading reviews: ' + err.message);
      res.status(500).json({ error: 'Failed to fetch reviews' });
      return;
    }
    res.json(results);
  });
});

// Update a review
router.put('/reviews/:id', (req, res) => {
  // Extract data from the request body
  const { author, text, rating } = req.body;
  
  // Extract the 'id' parameter from the request URL to identify the review to update
  const reviewId = req.params.id;
  
  // Define the SQL query to update a review based on its 'id'
  const sql = 'UPDATE reviews SET author = ?, text = ?, rating = ? WHERE id = ?';
  
  // Execute the SQL query with the provided data and 'reviewId'
  db.query(sql, [author, text, rating, reviewId], (err) => {
    if (err) {
      console.error('Error updating review: ' + err.message);
      res.status(500).json({ error: 'Failed to update review' });
      return;
    }
    res.json({ message: 'Review updated' });
  });
});

// Delete a review
router.delete('/reviews/:id', (req, res) => {
  // Extract the 'id' parameter from the request URL to identify the review to delete
  const reviewId = req.params.id;
  
  // Define the SQL query to delete a review based on its 'id'
  const sql = 'DELETE FROM reviews WHERE id = ?';
  
  // Execute the SQL query with the provided 'reviewId'
  db.query(sql, [reviewId], (err) => {
    if (err) {
      console.error('Error deleting review: ' + err.message);
      res.status(500).json({ error: 'Failed to delete review' });
      return;
    }
    res.json({ message: 'Review deleted' });
  });
});

// Export the router for use in other parts of the application
module.exports = router;
