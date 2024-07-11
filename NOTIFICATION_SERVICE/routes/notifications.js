var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dbpool = require("../db/DB_PG");

// Adds a single test kit purchase record into the DB.
router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { user_id, notification_period, custom_message, last_sent } = req.body;

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
        // Create uuid
        const order_id = uuidv4();
        const user_test_kit_order_id = uuidv4();
        const order_date = new Date().toLocaleDateString('en-CA',{year: 'numeric', month: '2-digit', day: '2-digit',timeZone:'Australia/Melbourne'})

        console.log(order_date);

        const orderInsertResult = await dbpool.query(
          "INSERT INTO Notification_preference (order_id,order_date) VALUES ($1,$2)",
          [order_id, order_date]
        );


        // user
        res.status(200).json(orderInsertResult.rows);
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
