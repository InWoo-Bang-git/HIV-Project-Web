var express = require("express");
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId

const mongodb = require('../data/DBconnect');


router.get("/:pageID", async (req, res) => {
  // Our login logic starts here
  try {
    const pageID = req.params.pageID;
    const db = mongodb.getDB();
    const contentModel = await db.model(mongodb.SCHMA_NAMES.content);
    const fetchedContent = await contentModel.find({_id:pageID}).lean().exec();
    res.status(200).json(fetchedContent);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
