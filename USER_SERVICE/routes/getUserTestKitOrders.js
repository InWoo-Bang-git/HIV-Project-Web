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
        //get test kits order
        const kit_result = await dbpool.query(
          "SELECT utko.user_test_kit_order_id, utko.user_id, utko.order_id, tko.order_id, tko.order_date FROM User_Test_Kit_Order AS utko INNER JOIN Test_Kit_Order AS tko ON utko.order_id=tko.order_id");

        console.log(kit_result);

        // user
        res.status(200).json({status: 200, message: "Test kit orders", body: kit_result.rows});
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
