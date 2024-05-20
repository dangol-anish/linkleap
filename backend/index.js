const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const pool = require("./model/config.js");

// user defined imports
const errorHandler = require("./utils/errorHandler.js");
const verifyToken = require("./utils/verifyToken.js");
const {
  verifyUserToken,
} = require("../backend/controllers/auth.controller.js");
const authRouter = require("./routes/auth.router.js");
const userRouter = require("./routes/user.route.js");
const companyRouter = require("./routes/company.route.js");
const customerRouter = require("./routes/customer.route.js");
const dashboardData = require("./routes/dashboard.route.js");

// middlewares
app.use(
  cors({
    origin: process.env.API_URL,
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.API_URL);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", verifyToken, userRouter);
app.use("/api/company", verifyToken, companyRouter);
app.use("/api/customer", verifyToken, customerRouter);
app.use("/api/dashboard", verifyToken, dashboardData);
app.get("/verifyUserToken", verifyToken, verifyUserToken);
app.get("/", (req, res) => {
  res.send("Node on Vercel");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(process.env.PORT, () => {
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
