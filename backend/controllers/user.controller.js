const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

const getUserData = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const getUserDataQuery =
      "select id, user_name, user_display_name, user_email, user_type from users where id <> $1 order by id ";

    const getUserDataResult = await pool.query(getUserDataQuery, [userId]);

    if (getUserDataResult.rowCount > 0) {
      res.status(200).json({
        message: getUserDataResult.rows,
        success: true,
      });
    } else {
      res.status(200).json({
        message: [],
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentUserData = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const getCurrentUserDataQuery =
      "select id, user_name, user_display_name, user_email, user_type from users where id = $1 ";

    const getCurrentUserDataResult = await pool.query(getCurrentUserDataQuery, [
      userId,
    ]);

    if (getCurrentUserDataResult.rowCount > 0) {
      const userData = getCurrentUserDataResult.rows[0];
      const { user_display_name, user_name, user_email, user_type } = userData;
      const formattedData = {
        userDisplayName: user_display_name,
        userName: user_name,
        userEmail: user_email,
        userType: user_type,
      };
      res.status(200).json({
        message: formattedData,
        success: true,
      });
    } else {
      res.status(200).json({
        message: "This user doesnt exist!",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

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

const deleteUserData = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deleteUserQuery = "delete from users where id = $1";
    const deleteUserResult = await pool.query(deleteUserQuery, [userId]);

    if (deleteUserResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "User successfully deleted!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Failed to delete user data!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateUserData = async (req, res, next) => {
  const { userName, userDisplayName, userEmail, userType, userPassword } =
    req.body;

  const { userId } = req.params;

  try {
    const checkEmailQuery =
      "SELECT id FROM users WHERE user_email = $1 AND id != $2";
    const checkEmailResult = await pool.query(checkEmailQuery, [
      userEmail,
      userId,
    ]);

    if (checkEmailResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already in use by another user",
      });
    }

    let hashedUpdatedPassword;

    if (!userPassword || userPassword.trim() === "") {
      // If userPassword is empty or undefined, retrieve the current password from the database
      const getUserQuery = "SELECT user_password FROM users WHERE id = $1";
      const getUserResult = await pool.query(getUserQuery, [userId]);

      if (getUserResult.rows.length > 0) {
        hashedUpdatedPassword = getUserResult.rows[0].user_password;
      } else {
        throw new Error("User not found");
      }
    } else {
      hashedUpdatedPassword = bcryptjs.hashSync(userPassword, 10);
    }

    const updateUserQuery =
      "UPDATE users SET user_display_name = $1, user_name = $2, user_email = $3, user_password = $4, user_type = $5 WHERE id = $6";

    const updateUserResult = await pool.query(updateUserQuery, [
      userDisplayName,
      userName,
      userEmail,
      hashedUpdatedPassword,
      userType,
      userId,
    ]);

    if (updateUserResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "User successfully updated!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserData,
  addUserData,
  deleteUserData,
  getCurrentUserData,
  updateUserData,
};
