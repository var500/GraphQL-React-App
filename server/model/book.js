const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add the Book Name"],
  },
  genre: {
    type: String,
    required: [true, "Please add the book Genre"],
  },
  authorId: {
    type: String,
    required: [true, "Please add the Author AuthorId"],
  },
});

module.export = mongoose.model("Book", bookSchema);
