var express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

const mongodb = require("../data/DBconnect");

router.get("/", async (req, res) => {
  // Our login logic starts here
  try {
    const user_id = req.query.user_id;
    console.log(user_id);
    const db = mongodb.getDB();
    const bookMarkModel = await db.model(mongodb.SCHMA_NAMES.bookMark);
    const fetchedContent = await bookMarkModel
      .find({ user_id: user_id })
      .lean()
      .exec();
    res.status(200).json(fetchedContent);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    const { user_id, content_id, name } = req.body;
    console.log(user_id);
    const db = mongodb.getDB();
    const bookMarkModel = await db.model(mongodb.SCHMA_NAMES.bookMark);

    const filter = { user_id: user_id };
    const update = {
      $push: {
        bookMarks: {
          _id: new ObjectId(),
          name,
          content_id,
        },
      },
    };

    const fetchedContent = await bookMarkModel.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true }
    );

    res.status(200).json(fetchedContent);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
