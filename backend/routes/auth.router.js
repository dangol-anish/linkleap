const express = require("express");
const router = express.Router();

// controller imports
const { login, logout } = require("../controllers/auth.controller.js");

router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
