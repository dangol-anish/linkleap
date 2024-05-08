const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

// const getUserData = async (req, res, next) => {
//   try {
//     const getUserDataQuery =
//       "select user_name, user_display_name, user_email, user_type from user where user ";
//   } catch (error) {
//     next(error);
//   }
// };

const addUserData = async (req, res, next) => {
  const { userDisplayName, userEmail, userName, userPassword, userType } =
    req.body;

  try {
    const checkExistingUserQuery =
      "select id from users where user_email = $1 or user_name = $2";

    const checkExistingUserResult = await pool.query(checkExistingUserQuery, [
      userEmail,
      userName,
    ]);

    if (checkExistingUserResult.rowCount > 0) {
      return next(
        errorHandler(404, "User with this email or username already exists!")
      );
    }

    const hashedPassword = bcryptjs.hashSync(userPassword, 10);

    const insertNewUserDataQuery =
      "insert into users (user_name, user_display_name, user_email, user_password, user_type) values($1, $2, $3, $4, $5)";

    const insertNewUserDataResult = await pool.query(insertNewUserDataQuery, [
      userName,
      userDisplayName,
      userEmail,
      hashedPassword,
      userType,
    ]);

    if (insertNewUserDataResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "New User Created!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { dashboardData, addUserData };
