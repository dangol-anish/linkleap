const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());

// routes
const authRouter = require("./routes/auth.router.js");

app.use("/api/auth", authRouter);

// superadmin creation and postgres query connection example

// app.post("/admin", async (req, res) => {
//   const { userName, userDisplayName, userEmail, userPassword, userType } =
//     req.body;

//   const hashedPassword = bcryptjs.hashSync(userPassword, 10);
//   const query = await pool.query(
//     "insert into users (user_name, user_display_name, user_email, user_password, user_type) values($1, $2, $3, $4, $5)",
//     [userName, userDisplayName, userEmail, hashedPassword, userType]
//   );

//   res.json(query);
// });

// routes

app.listen(3000, () => {
  console.log("Running on port 3000");
});
