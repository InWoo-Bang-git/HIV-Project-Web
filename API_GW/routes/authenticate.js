var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dbpool = require("../misc/DB_PG");

router.post("/", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    } else {
      // Validate if user exist in our database
      const result = await dbpool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (
        result.rowCount === 1 &&
        (await bcrypt.compare(password, result.rows[0].password))
      ) {
        // Create token
        const token = jwt.sign({ email, name: result.rows[0].name, role: result.rows[0].role }, process.env.ENCRYPTION_KEY, {
          expiresIn: "2h",
        });

        // save user token
        console.log(token);
        const updateResult = await dbpool.query(
          "UPDATE users SET token=$1 where email=$2 RETURNING token, role, name",
          [token, email]
        );

        // user
        res.status(200).json(updateResult.rows);
      } else {
        res.status(400).send("Invalid Credentials");
      }
    }
  } catch (err) {
    console.log("+++");
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
