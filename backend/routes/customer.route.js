const express = require("express");
const router = express.Router();

const {
  addCustomerData,
  getCustomerData,
} = require("../controllers/customer.controller.js");

router.post("/addNewCustomer", addCustomerData);
router.post("/", getCustomerData);

module.exports = router;
