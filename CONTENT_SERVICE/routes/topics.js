var express = require("express");
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId

const mongodb = require('../data/DBconnect');


// Return all topics
router.get("/", async (req, res) => {
  // Our login logic starts here
  try {
    const db = mongodb.getDB();
    const topicModel = await db.model(mongodb.SCHMA_NAMES.topic);
    const fetchedContent = await topicModel.find().lean().exec();
    res.status(200).json(fetchedContent);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
