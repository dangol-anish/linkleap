const express = require("express");
const router = express.Router();

const {
  getUserData,
  addUserData,
} = require("../controllers/dashboard.controller.js");

router.post("/", getUserData);
router.post("/addNewUser", addUserData);

module.exports = router;
