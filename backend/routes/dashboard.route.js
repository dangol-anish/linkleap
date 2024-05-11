const express = require("express");
const router = express.Router();

const {
  getUserData,
  addUserData,
  deleteUserData,
} = require("../controllers/dashboard.controller.js");

router.post("/", getUserData);
router.post("/addNewUser", addUserData);
router.delete("/deleteUser/:userId", deleteUserData);

module.exports = router;
