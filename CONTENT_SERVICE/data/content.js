
var mongoose = require("mongoose");



const contentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  meta: {
    sections:[Object]
  },
  content: {
    type: String,
    required: true,
  },
});


module.exports = contentSchema;