const express = require("express");
const router = express.Router();

const dashboardData = require("../controllers/dashboard.controller.js");

router.get("/", dashboardData);

module.exports = router;
