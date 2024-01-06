// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');

// Get all books
router.get('/', BookController.getAllBooks);

// Get book by ID
router.get('/:id', BookController.getBookById);

// Create a new book
router.post('/', BookController.createBook);

// Update a book
router.put('/:id', BookController.updateBook);

// Delete a book
router.delete('/:id', BookController.deleteBook);

module.exports = router;
