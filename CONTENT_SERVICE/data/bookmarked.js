var mongoose = require("mongoose");

const bookMarkSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  bookMarks: [
    {
      name: {
        type: String,
        required: true,
      },
      content_id: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = bookMarkSchema;
