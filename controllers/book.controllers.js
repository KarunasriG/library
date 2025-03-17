const Book = require("../models/Book.models");
const Author = require("../models/Author.models");
const Genre = require("../models/Genre.models");

// Get all books
async function getBooks(req, res) {
  try {
    const books = await Book.findAll();
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a book by Author ID
async function getBookByAuthorId(req, res) {
  const { authorId } = req.params;
  //   check if authorId is provided
  if (!authorId) {
    return res
      .status(400)
      .json({ message: "Author ID is required for this request" });
  }
  try {
    const books = await Book.findAll({
      where: { authorId },
    });
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a book by Genre ID
async function getBookByGenreId(req, res) {
  const { genreId } = req.params;
  //   check if genreId is provided
  if (!genreId) {
    return res
      .status(400)
      .json({ message: "Genre ID is required for this request" });
  }
  try {
    const books = await Book.findAll({
      include: [
        {
          model: Genre,
          where: { id: genreId },
        },
      ],
    });
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add a new book

async function addBook(req, res) {
  try {
    const { title, authorId, genreIds, description, publicationYear } =
      req.body;

    // Validate required fields
    if (!title || !description || !publicationYear || !authorId || !genreIds) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if author exists
    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Check if genres exist
    const genres = await Genre.findAll({
      where: { id: genreIds },
    });
    if (genres.length !== genreIds.length) {
      return res.status(404).json({ error: "One or more genres not found" });
    }

    // Create book and associate with genres
    const book = await Book.create({
      title,
      description,
      publicationYear,
      authorId,
    });
    await book.setGenres(genres);

    // Fetch the created book with associations
    const createdBook = await Book.findByPk(book.id, {
      include: [
        {
          model: Author,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Genre,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          through: { attributes: [] },
        },
      ],
    });
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getBooks, getBookByAuthorId, getBookByGenreId, addBook };
