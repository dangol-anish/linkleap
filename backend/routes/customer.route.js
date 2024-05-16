const express = require("express");
const router = express.Router();

const {
  addCustomerData,
  getCustomerData,
  deleteCustomerData,
  getCurrentCustomerData,
} = require("../controllers/customer.controller.js");

router.post("/addNewCustomer", addCustomerData);
router.post("/", getCustomerData);
router.delete("/deleteCustomer/:customerId", deleteCustomerData);
router.post("/getCurrentCustomerData/:customerId", getCurrentCustomerData);

module.exports = router;
