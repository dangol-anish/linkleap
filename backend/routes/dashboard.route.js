const express = require("express");
const router = express.Router();

const {
  dashboardData,
  addUserData,
} = require("../controllers/dashboard.controller.js");

router.get("/", dashboardData);
router.post("/addNewUser", addUserData);

module.exports = router;
