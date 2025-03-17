let { DataTypes, sequelize } = require("../config/database.js");
const Author = require("./Author.models");
const Genre = require("./Genre.models");

const Book = sequelize.define("Book", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;

//  Associations
Book.belongsTo(Author, {
  foreignKey: {
    name: "authorId",
    allowNull: false,
  },
});
Author.hasMany(Book, { foreignKey: "authorId" });

Book.belongsToMany(Genre, { through: "BookGenres" });
Genre.belongsToMany(Book, { through: "BookGenres" });
