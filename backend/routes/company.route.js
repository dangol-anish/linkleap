const express = require("express");
const router = express.Router();

const {
  getCompanyData,
  addCompanyData,
} = require("../controllers/company.controller.js");

router.post("/", getCompanyData);
router.post("/addNewCompany", addCompanyData);

module.exports = router;
