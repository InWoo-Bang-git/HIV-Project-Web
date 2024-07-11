var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
const { generateUsername } = require("unique-username-generator");


const dbpool = require("../misc/DB_PG");

const REGISTER_INPUTS = [
  'email',
  'password',
  'role'
]

router.post("/", async (req, res) => {
  // Our register logic starts here
  try {
    
    // Validate user input
    if (isInvalidInput(REGISTER_INPUTS,req.body)) {
      res.status(400).send("All inputs are required");
    } else {
      // Validate if user exist in our database
      const { email, password, role } = req.body;
      var name = req.body?.name;
      const result = await dbpool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (result.rowCount > 0) {
        return res.status(409).send("User Already Exist. Please Login");
      } else {
        if(!name || name === ""){
          name = generateUsername()
        }
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 1);

        // Create token
        const token = await jwt.sign({ name, email, role }, process.env.ENCRYPTION_KEY, {
          expiresIn: "2h",
        });

        const user_id = uuidv4();

        // // Create user in our database
        const userResult = await dbpool.query(
          "INSERT INTO users (name, email, password, token, role,id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING token, email, name, role",
          [name, email, encryptedPassword, token, role, user_id]
        );

        res.status(201).json(userResult.rows);
      }
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

const isInvalidInput = (expectedInputs,currentInputs) => {
  let hasError = false;
  console.log(expectedInputs)
  expectedInputs.forEach(element => {
    if(!currentInputs[element] || currentInputs[element] === ''){
      hasError = true;
    }
  });
  return hasError;
}

module.exports = router;
