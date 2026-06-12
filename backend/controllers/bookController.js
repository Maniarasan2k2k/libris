import Book from '../models/Book.js';

// @desc    Create a new book
// @route   POST /api/books
// @access  Public (Admin)
export const createBook = async (req, res) => {
  try {
    const { title, author, isbn, genre, totalCopies, publishedYear } = req.body;

    // Check if book with ISBN already exists
    const isbnExists = await Book.findOne({ isbn });
    if (isbnExists) {
      return res.status(400).json({ message: 'A book with this ISBN already exists' });
    }

    // availableCopies starts equal to totalCopies
    const availableCopies = totalCopies;

    const book = await Book.create({
      title,
      author,
      isbn,
      genre,
      totalCopies,
      availableCopies,
      publishedYear,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all books (with optional search)
// @route   GET /api/books
// @access  Public (Admin)
export const getAllBooks = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
// @access  Public (Admin)
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a book by ID
// @route   PUT /api/books/:id
// @access  Public (Admin)
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if ISBN is being changed and is already taken
    if (req.body.isbn && req.body.isbn !== book.isbn) {
      const isbnExists = await Book.findOne({ isbn: req.body.isbn });
      if (isbnExists) {
        return res.status(400).json({ message: 'A book with this ISBN already exists' });
      }
    }

    // If totalCopies is being updated, adjust availableCopies logically
    if (req.body.totalCopies !== undefined) {
      const diff = req.body.totalCopies - book.totalCopies;
      req.body.availableCopies = book.availableCopies + diff;

      if (req.body.availableCopies < 0) {
        return res.status(400).json({ message: 'New total copies is less than currently issued copies' });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
// @access  Public (Admin)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
