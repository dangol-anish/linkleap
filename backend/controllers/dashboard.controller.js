const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

const dashboardData = async (req, res, next) => {
  res.json({
    message: "test",
  });
};

module.exports = dashboardData;
