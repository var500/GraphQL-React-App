const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add the Author Name"],
      },
      age: {
        type: Number,
        required: [true, "Please add the Author Age"],
      },
});

module.exports = mongoose.model("Author", AuthorSchema);