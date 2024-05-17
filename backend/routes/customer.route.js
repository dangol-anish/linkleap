const express = require("express");
const router = express.Router();

const {
  addCustomerData,
  getCustomerData,
  deleteCustomerData,
  getCurrentCustomerData,
  updateCustomerData,
  changeStatus,
  getCustomerLogs,
} = require("../controllers/customer.controller.js");

router.post("/addNewCustomer", addCustomerData);
router.post("/", getCustomerData);
router.delete("/deleteCustomer/:customerId", deleteCustomerData);
router.post("/getCurrentCustomerData/:customerId", getCurrentCustomerData);
router.post("/getCustomerLogs/:customerId", getCustomerLogs);
router.post("/updateCustomerData/:customerId&:userId", updateCustomerData);
router.post("/changeStatus/:selectedStatus&:customerId&:userId", changeStatus);

module.exports = router;
