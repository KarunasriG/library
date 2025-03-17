const express = require("express");
const { sequelize } = require("./config/database");
const Author = require("./models/Author.models");
const Book = require("./models/Book.models");
const Genre = require("./models/Genre.models");
const bookRouter = require("./routes/book.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const authorsData = [
  {
    name: "J.K. Rowling",
    birthdate: "1965-07-31",
    email: "jkrowling@books.com",
  },
  {
    name: "George R.R. Martin",
    birthdate: "1948-09-20",
    email: "grrmartin@books.com",
  },
];

const genresData = [
  { name: "Fantasy", description: "Magical and mythical stories." },
  {
    name: "Drama",
    description: "Fiction with realistic characters and events.",
  },
];

const booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    description: "A young wizard's journey begins.",
    publicationYear: 1997,
    authorId: 1,
  },
  {
    title: "Game of Thrones",
    description: "A medieval fantasy saga.",
    publicationYear: 1996,
    authorId: 2,
  },
];

// Seed data
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    const authors = await Author.bulkCreate(authorsData);
    const genres = await Genre.bulkCreate(genresData);
    const books = await Book.bulkCreate(booksData);

    await books[0].setGenres([genres[0]]);
    await books[1].setGenres([genres[0], genres[1]]);

    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/", bookRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
