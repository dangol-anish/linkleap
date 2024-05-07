const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler.js");
const verifyToken = require("./utils/verifyToken.js");
const {
  verifyUserToken,
} = require("../backend/controllers/auth.controller.js");

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
const authRouter = require("./routes/auth.router.js");
const dashboardRouter = require("./routes/dashboard.route.js");

app.use("/api/auth", authRouter);
app.use("/api/dashboard", verifyToken, dashboardRouter);
app.get("/verifyUserToken", verifyToken, verifyUserToken);

// routes

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

module.exports = errorHandler;

app.listen(3000, () => {
  console.log("Running on port 3000");
});

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
