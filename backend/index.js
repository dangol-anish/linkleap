const express = require("express");
const app = express();
const pool = require("./database.js");

// middlewares

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    const query = await pool.query(
      "insert into tbl_test2 values($1) returning *",
      [text]
    );

    res.json(query);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
