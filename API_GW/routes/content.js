var express = require("express");

var connection = require("../misc/axiosConnection");
var router = express.Router();

// Return all topics
router.get("/page/:pageID", async (req, res) => {
  // Our login logic starts here
  const pageID = req.params.pageID;
  try {
    const response = await connection.contentConnection.get("/page/" + pageID, {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
  // Our register logic ends here
});

router.get("/topics", async (req, res) => {
  // Our login logic starts here
  const pageID = req.params.pageID;
  try {
    const response = await connection.contentConnection.get("/topics/", {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
  // Our register logic ends here
});

router.get("/bookmarks", async (req, res) => {
  // Our login logic starts here
  const user_id = req.query.user_id;
  try {
    const response = await connection.contentConnection.get("/bookmarks", {
      method: "get",
      params:{user_id}
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
  // Our register logic ends here
});

router.post("/bookmarks", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.contentConnection.post("/bookmarks", req.body);
    res.send(response.data);
  } catch (error) {
    console.error(error);
  }
  // Our register logic ends here
});

module.exports = router;
