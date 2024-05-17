const express = require("express");
const router = express.Router();

const {
  getCompanyData,
  addCompanyData,
  deleteCompanyData,
  getCurrentCompanyData,
  updateCompanyData,
  customersInCompany,
} = require("../controllers/company.controller.js");

router.post("/", getCompanyData);
router.post("/addNewCompany", addCompanyData);
router.delete("/deleteCompany/:companyId", deleteCompanyData);
router.post("/getCurrentCompanyData/:companyId", getCurrentCompanyData);
router.post("/updateCompanyData/:companyId", updateCompanyData);
router.post("/customersInCompany/:companyId", customersInCompany);

module.exports = router;
