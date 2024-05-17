const express = require("express");
const router = express.Router();

const { getDashboardData } = require("../controllers/dashboard.controller.js");

router.get("/", getDashboardData);

module.exports = router;
