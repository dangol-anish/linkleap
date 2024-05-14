const express = require("express");
const router = express.Router();

const {
  getCompanyData,
  addCompanyData,
  deleteCompanyData,
  getCurrentCompanyData,
} = require("../controllers/company.controller.js");

router.post("/", getCompanyData);
router.post("/addNewCompany", addCompanyData);
router.delete("/deleteCompany/:companyId", deleteCompanyData);
router.post("/getCurrentCompanyData/:companyId", getCurrentCompanyData);

module.exports = router;
