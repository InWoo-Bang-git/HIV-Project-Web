var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dbpool = require("../db/DB_PG");

// Adds a single test kit purchase record into the DB.
router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { user_id, result_outcome } = req.body;

    // Validate user input
    if (!(user_id) || !(result_outcome)) {
      res.status(400).send("All input is required");
    } else {
      // Validate if user exist in our database
      const result = await dbpool.query(
        "SELECT * FROM users WHERE id = $1",
        [user_id]
      );

      if (result.rowCount === 1) {
        // Create uuid
        const result_id = uuidv4();
        const user_test_result_id = uuidv4();
        const result_date = new Date().toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit',timeZone:'Australia/Melbourne'})

        console.log(result_date);

        const testResultInsertResult = await dbpool.query(
          "INSERT INTO Test_Result (result_id, result_outcome, result_date) VALUES ($1, $2, $3)",
          [result_id, result_outcome, result_date]
        );

        const userTestInsertResult = await dbpool.query(
            "INSERT INTO User_Test_Result (user_test_result_id, customer_id, result_id) VALUES ($1, $2, $3)",
            [user_test_result_id, user_id, result_id]
        );

        // user
        res.status(200).json({status: 200, message: "Test result added successfully", body: {user_id: user_id, result_id: result_id, result_outcome: result_outcome, result_date: result_date}});
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
