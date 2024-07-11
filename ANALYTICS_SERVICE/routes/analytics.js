var express = require("express");
var router = express.Router();

const dbpool = require("../db/DB_PG");

// Adds a single test kit purchase record into the DB.
router.get("/gender", async (req, res) => {
  // Our login logic starts here
  try {
    const groupedResult = await dbpool.query(
      `SELECT d.gender , COUNT(*) 
    FROM demographics d  
    GROUP BY d.gender ;`
    );

    const totalCount = await dbpool.query(
      `SELECT COUNT(*) 
      FROM demographics d`
    );

    console.log(groupedResult);
    console.log(totalCount);

    // user
    res.status(200).json({
      groupedResult: groupedResult.rows,
      totalCount: totalCount.rows,
    });
  } catch (err) {
    res.status(500).send(err)
  }
  // Our register logic ends here
});

// Adds a single test kit purchase record into the DB.
router.get("/sexual-orientation", async (req, res) => {
  // Our login logic starts here
  try {
    const groupedResult = await dbpool.query(
      `SELECT d.sexual_orientation , COUNT(*) 
      FROM demographics d  
      GROUP BY d.sexual_orientation ;`
    );

    const totalCount = await dbpool.query(
      `SELECT COUNT(*) 
        FROM demographics d`
    );

    console.log(groupedResult);
    console.log(totalCount);

    // user
    res.status(200).json({
      groupedResult: groupedResult.rows,
      totalCount: totalCount.rows,
    });
  } catch (err) {
    console.log("+++");
    console.log(err);
    res.status(500).send(err)
  }
  // Our register logic ends here
});

// Adds a single test kit purchase record into the DB.
router.get("/state", async (req, res) => {
  // Our login logic starts here
  try {
    const groupedResult = await dbpool.query(
      `SELECT d.state , COUNT(*) 
      FROM demographics d  
      GROUP BY d.state ;`
    );

    const totalCount = await dbpool.query(
      `SELECT COUNT(*) 
        FROM demographics d`
    );

    console.log(groupedResult);
    console.log(totalCount);

    // user
    res.status(200).json({
      groupedResult: groupedResult.rows,
      totalCount: totalCount.rows,
    });
  } catch (err) {
    console.log("+++");
    console.log(err);
    res.status(500).send(err)
  }
  // Our register logic ends here
});

// Get all cases
router.get("/cases", async (req, res) => {
  // Our login logic starts here
  try {
    // Abomination !!!! must optimize kek
    const groupedResult = await dbpool.query(
      `select foo2.result_date,foo2.customer_id,foo2.result_outcome, u."name", u.email  from (select tr2.result_date,foo.customer_id,tr2.result_outcome  from (SELECT   
        MAX(tr.result_date) MaxDate,
        utr.customer_id  
FROM    test_result tr
inner join user_test_result utr 
on tr.result_id = utr.result_id 
GROUP BY customer_id) as foo inner join user_test_result utr2 on utr2.customer_id = foo.customer_id
inner join test_result tr2 on tr2.result_id = utr2.result_id 
where foo.maxdate = tr2.result_date )foo2 inner join users u on u.id = foo2.customer_id;`
    );

    const positive_count = await dbpool.query(
      `select count( foo2.customer_id)  from (select tr2.result_date,foo.customer_id,tr2.result_outcome  from (SELECT   
        MAX(tr.result_date) MaxDate,
        utr.customer_id  
FROM    test_result tr
inner join user_test_result utr 
on tr.result_id = utr.result_id 
GROUP BY customer_id) as foo inner join user_test_result utr2 on utr2.customer_id = foo.customer_id
inner join test_result tr2 on tr2.result_id = utr2.result_id 
where foo.maxdate = tr2.result_date )foo2 inner join users u on u.id = foo2.customer_id where foo2.result_outcome='Positive';`
    );

    const negative_count = await dbpool.query(
      `select count( foo2.customer_id)  from (select tr2.result_date,foo.customer_id,tr2.result_outcome  from (SELECT   
        MAX(tr.result_date) MaxDate,
        utr.customer_id  
FROM    test_result tr
inner join user_test_result utr 
on tr.result_id = utr.result_id 
GROUP BY customer_id) as foo inner join user_test_result utr2 on utr2.customer_id = foo.customer_id
inner join test_result tr2 on tr2.result_id = utr2.result_id 
where foo.maxdate = tr2.result_date )foo2 inner join users u on u.id = foo2.customer_id where foo2.result_outcome='Negative';`
    );

    // user
    res.status(200).json({
      allUsers: groupedResult.rows,
      positive_count:positive_count.rows,
      negative_count:negative_count.rows
    });
  } catch (err) {
    console.log("+++");
    console.log(err);
    res.status(500).send(err)
  }
  // Our register logic ends here
});

module.exports = router;
