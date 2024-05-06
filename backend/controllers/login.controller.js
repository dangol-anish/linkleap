const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../model/config.js");

// controller for logging into the system
const login = async (req, res) => {
  const { userName, userPassword } = req.body;
  try {
    // check if the user exists
    const checkExistingUserQuery = "select * from users where user_name = $1";

    const checkExistingUserResult = await pool.query(checkExistingUserQuery, [
      userName,
    ]);

    if (!checkExistingUserResult.rowCount > 0) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    // check if the password matches with the existing password
    const storedPassword = checkExistingUserResult.rows[0].user_password;

    const validPassword = bcryptjs.compareSync(userPassword, storedPassword);

    if (!validPassword) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
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
    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: rest,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
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
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { logout, login };
