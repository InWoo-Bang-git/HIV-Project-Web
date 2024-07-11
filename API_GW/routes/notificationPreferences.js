var express = require("express");

var connection = require("../misc/axiosConnection");
var router = express.Router();

// Return notification preferences of a user
router.get("/preferences/user/:userID", async (req, res) => {
  // Our login logic starts here
  const userID = req.params.userID;
  try {
    const response = await connection.notificationConnection.get("/preferences/user/" + userID, {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.log(error.data)
    res.send(error.response.data);
  }
  // Our register logic ends here
});


router.post("/preferences", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.notificationConnection.post("/preferences", req.body);
    res.send(response.data);
  } catch (error) {
    console.error(error.response.data);
    res.send(error.response.data);
  }
  // Our register logic ends here
});

module.exports = router;
