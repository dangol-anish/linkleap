const express = require("express");
const router = express.Router();

const {
  getUserData,
  addUserData,
  deleteUserData,
  getCurrentUserData,
  updateUserData,
} = require("../controllers/dashboard.controller.js");

router.post("/", getUserData);
router.post("/addNewUser", addUserData);
router.delete("/deleteUser/:userId", deleteUserData);
router.post("/getCurrentUserData/:userId", getCurrentUserData);
router.put("/updateUserData/:userId", updateUserData);

module.exports = router;
