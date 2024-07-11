var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dbpool = require("../db/DB_PG");

// Adds a single test kit purchase record into the DB.
router.get("/:userID", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const user_id = req.params.userID;

    // Validate user input
    if (!(user_id)) {
      res.status(400).send("All input is required");
    } else {
      // Validate if user exist in our database
      const result = await dbpool.query(
        "SELECT * FROM users WHERE id = $1",
        [user_id]
      );

      if (result.rowCount === 1) {
        //get user test results
        
        const demographicsResult = await dbpool.query(
          "SELECT * FROM Demographics WHERE user_id = $1",
          [user_id]
          );

        console.log(demographicsResult);

        // user
        res.status(200).json({status: 200, message: "User Demographics", body: demographicsResult.rows});
      } else {
        res.status(400).send("Invalid User");
      }
    }
  } catch (err) {
    console.log("+++");
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
