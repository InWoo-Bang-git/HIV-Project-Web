var mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sub_topics: [
    {
      name: {
        type: String,
        required: true,
      },
      content_id:{
        type: String,
        required: true,
      }
    },
  ],
});

module.exports = topicSchema;
