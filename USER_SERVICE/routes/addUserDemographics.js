var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dbpool = require("../db/DB_PG");

// Adds a single test kit purchase record into the DB.
router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { user_id, ethnicity, residential_status, nationality, state, postal_code, city, gender, sexual_orientation } = req.body;

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
        // Create demographic_id
        const demographic_id = uuidv4();
        console.log(demographic_id);

        const demographicResult = await dbpool.query(
            "INSERT INTO Demographics (demographic_id, ethnicity, residential_status, nationality, state, postal_code, city, gender, sexual_orientation, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING demographic_id, ethnicity, residential_status, nationality, state, postal_code, city, gender, sexual_orientation",
            [demographic_id, ethnicity, residential_status, nationality, state, postal_code, city, gender, sexual_orientation, user_id] 
        );

        // user demographics
        res.status(200).json({status: 200, message: "User demographics added successfully", body: demographicResult.rows});
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
