var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

const dbpool = require("../db/DB_PG");

// Ge all user information
router.get("/", async (req, res) => {
  // Our login logic starts here
  try {

    //get users
    const user_result = await dbpool.query(
      "SELECT name,email,role,id FROM users");

    console.log(user_result);

    if (user_result.rowCount !== 0) {
      // users
      res.status(200).json(user_result.rows);
    } else {
      res.status(400).send("No record found");
    }

  } catch (err) {
    console.log("+++");
    console.log(err);
    res.send(500).send("Internal server error")
  }
  // Our register logic ends here
});

router.patch("/:userID", async (req, res) => {
  // Our login logic starts here
  try {

    const user_id = req.params.userID;

    // Get user input
    const {email, role, user_name } = req.body;

    // Validate user input
    if (!(user_id)) {
      res.status(400).send("Unspecified user");
    } else {
      // Validate if user exist in our database
      const result = await dbpool.query(
        "SELECT * FROM users WHERE id = $1",
        [user_id]
      );

      if (result.rowCount === 1) {
        console.log(result.rows[0])
        // Patch user values
        const new_name = user_name || result.rows[0].name;
        const new_role = role || result.rows[0].role;
        const new_email = email || result.rows[0].email;

        const patchResult = await dbpool.query(
            "UPDATE Users SET name=$1, email=$2, role=$3 WHERE id=$4",
            [new_name,new_email,new_role,user_id] 
        );

        // user demographics
        res.status(200).json(patchResult.rows);
      } else {
        res.status(400).send("Invalid User");
      }
    }
  } catch (err) {
    res.status(500).send(err)
  }
  // Our register logic ends here
});

module.exports = router;
