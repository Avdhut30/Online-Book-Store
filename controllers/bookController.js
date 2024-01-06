// controllers/bookController.js
const Book = require('../models/book');

const BookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getBookById: async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createBook: async (req, res) => {
    try {
      const { title, author, genre, description, price } = req.body;
      const newBook = await Book.create({ title, author, genre, description, price });
      return res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const { title, author, genre, description, price } = req.body;
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { title, author, genre, description, price },
        { new: true }
      );
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteBook: async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error('Error deleting book:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = BookController;
