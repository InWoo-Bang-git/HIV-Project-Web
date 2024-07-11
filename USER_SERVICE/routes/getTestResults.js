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
        const test_result = await dbpool.query(
          "SELECT utr.user_test_result_id, utr.customer_id, utr.result_id, tr.result_id, tr.result_outcome, tr.result_date FROM User_Test_Result AS utr INNER JOIN Test_Result AS tr ON utr.result_id=tr.result_id");

        console.log(test_result);

        // user
        res.status(200).json({status: 200, message: "Test results", body: test_result.rows});
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
