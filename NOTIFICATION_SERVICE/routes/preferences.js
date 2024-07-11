var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dbpool = require("../db/DB_PG");

// Adds a single test kit purchase record into the DB.
router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { user_id, notification_period, custom_message } = req.body;

    // Validate user input
    if (!user_id) {
      res.status(400).send("All input is required");
    } else {
      // Validate if user exist in our database
      const result = await dbpool.query("SELECT * FROM users WHERE id = $1", [
        user_id,
      ]);

      if (result.rowCount === 1) {
        // Create uuid
        const preference_id = uuidv4();

        const preferenceResult = await dbpool.query(
          "SELECT * FROM Notification_preference WHERE user_id=$1",
          [user_id]
        );

        if(preferenceResult.rowCount === 0){
          const orderInsertResult = await dbpool.query(
            "INSERT INTO Notification_preference (user_id,preference_id, notification_period, custom_message, last_sent) VALUES ($1, $2, $3,$4, null)",
            [user_id,preference_id, notification_period, custom_message]
          );
          res.status(200).json(orderInsertResult.rows);
        }
    
        res.status(400).send("Preferences for this user already exists");

      } else {
        res.status(400).send("Invalid User");
      }
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

router.get("/user/:userID", async (req, res) => {
  // Our login logic starts here
  const user_id = req.params.userID;
  try {
    // Validate user input
    if (!user_id) {
      res.status(400).send("All input is required");
    } else {
      // Validate if user exist in our database
      const result = await dbpool.query("SELECT * FROM users WHERE id = $1", [
        user_id,
      ]);

      if (result.rowCount === 1) {
        // Create uuid

        const orderInsertResult = await dbpool.query(
          "SELECT * FROM Notification_preference WHERE user_id=$1",
          [user_id]
        );

        res.status(200).json(orderInsertResult.rows);
      } else {
        res.status(400).send("Invalid User");
      }
    }
  } catch (error) {
    console.error(error);
  }
  // Our register logic ends here
});

module.exports = router;
