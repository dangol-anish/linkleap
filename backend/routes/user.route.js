const express = require("express");
const router = express.Router();

const {
  getUserData,
  addUserData,
  deleteUserData,
  getCurrentUserData,
  updateUserData,
} = require("../controllers/user.controller.js");

router.post("/", getUserData);
router.post("/addNewUser", addUserData);
router.delete("/deleteUser/:userId", deleteUserData);
router.post("/getCurrentUserData/:userId", getCurrentUserData);
router.post("/updateUserData/:userId", updateUserData);

module.exports = router;
