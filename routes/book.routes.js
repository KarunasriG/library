const express = require("express");
const {
  getBooks,
  getBookByAuthorId,
  getBookByGenreId,
  addBook,
} = require("../controllers/book.controllers");

const router = express.Router();

router.get("/books", getBooks);
router.get("/authors/:authorId/books", getBookByAuthorId);
router.get("/genres/:genreId/books", getBookByGenreId);

router.post("/books", addBook);

module.exports = router;
