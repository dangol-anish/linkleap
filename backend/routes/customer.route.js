const express = require("express");
const router = express.Router();

const {
  addCustomerData,
  getCustomerData,
  deleteCustomerData,
  getCurrentCustomerData,
  updateCustomerData,
} = require("../controllers/customer.controller.js");

router.post("/addNewCustomer", addCustomerData);
router.post("/", getCustomerData);
router.delete("/deleteCustomer/:customerId", deleteCustomerData);
router.post("/getCurrentCustomerData/:customerId", getCurrentCustomerData);
router.post("/updateCustomerData/:customerId&:userId", updateCustomerData);

module.exports = router;
