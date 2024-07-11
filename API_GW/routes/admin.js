var express = require("express");

var connection = require("../misc/axiosConnection");
var router = express.Router();

// Return all users
router.get("/users", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.userConnection.get("/users", {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error)
  }
  // Our register logic ends here
});

// Update a single user
router.patch("/users/:userID", async (req, res) => {
  // Our login logic starts here
  const user_id = req.params.userID;
  try {
    const response = await connection.userConnection.patch("/users/"+user_id,req.body);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error)
  }
  // Our register logic ends here
});

router.get("/analytics/gender", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.analyticsConnection.get("/statistics/gender", {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(response.data);
  }
  // Our register logic ends here
});

router.get("/analytics/sexual-orientation", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.analyticsConnection.get("/statistics/sexual-orientation", {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(response.data);
  }
  // Our register logic ends here
});

router.get("/analytics/state", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.analyticsConnection.get("/statistics/state", {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(response.data);
  }
  // Our register logic ends here
});

router.get("/analytics/cases", async (req, res) => {
  // Our login logic starts here
  try {
    const response = await connection.analyticsConnection.get("/statistics/cases", {
      method: "get",
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(response.data);
  }
  // Our register logic ends here
});

// router.get("/bookmarks", async (req, res) => {
//   // Our login logic starts here
//   const user_id = req.query.user_id;
//   try {
//     const response = await connection.contentConnection.get("/bookmarks", {
//       method: "get",
//       params:{user_id}
//     });
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//   }
//   // Our register logic ends here
// });

// router.post("/bookmarks", async (req, res) => {
//   // Our login logic starts here
//   try {
//     const response = await connection.contentConnection.post("/bookmarks", req.body);
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//   }
//   // Our register logic ends here
// });

module.exports = router;
