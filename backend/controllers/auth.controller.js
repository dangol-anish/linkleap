const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

// controller for logging into the system
const login = async (req, res, next) => {
  const { userName, userPassword } = req.body;

  try {
    // check if the user exists
    const checkExistingUserQuery = "select * from users where user_name = $1";

    const checkExistingUserResult = await pool.query(checkExistingUserQuery, [
      userName,
    ]);

    if (!checkExistingUserResult.rowCount > 0) {
      return next(errorHandler(404, "Invalid Credentials!"));
    }

    // check if the password matches with the existing password
    const storedPassword = checkExistingUserResult.rows[0].user_password;

    const validPassword = bcryptjs.compareSync(userPassword, storedPassword);

    if (!validPassword) {
      return next(errorHandler(404, "Invalid Credentials!"));
    }

    // send user details
    // separating user password using spread operator
    const { user_password: password, ...rest } =
      checkExistingUserResult.rows[0];

    // store jwt token in http only cookie
    const accessToken = jwt.sign(
      {
        id: checkExistingUserResult.rows[0].id,
      },
      process.env.JWT
    );
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not accessible to JavaScript
        secure: true, // Ensures the cookie is sent only over HTTPS
        same_site: "None", // Allows cross-site cookies
        domain: "vercel.app", // Or use your custom domain if you have one
        path: "/", // Ensures the cookie is sent for all paths
      })
      .status(200)
      .json({
        success: true,
        message: rest,
      });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({
      success: true,
      message: "Successfully logged out!",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      res.json({
        token,
      });
    } else {
      res.json({
        success: false,
        message: "User is not loggeed in",
      });
    }
  } catch (error) {}
};

module.exports = { logout, login, verifyUserToken };
