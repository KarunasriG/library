const express = require("express");
const {
  getBooks,
  getBookByAuthorId,
  getBookByGenreId,
  addBook,
  getAllAuthors,
  addAuthor,
  getAuthorByGenreId,
} = require("../controllers/book.controllers");

const router = express.Router();

// book
router.get("/books", getBooks);
router.get("/authors/:authorId/books", getBookByAuthorId);
router.get("/genres/:genreId/books", getBookByGenreId);

// author
router.get("/authors", getAllAuthors);
router.get("/genres/:genreId/authors", getAuthorByGenreId);

router.post("/books", addBook);
router.post("/authors", addAuthor);

module.exports = router;
