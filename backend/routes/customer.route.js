const express = require("express");
const router = express.Router();

const { addCustomerData } = require("../controllers/customer.controller.js");

router.post("/addNewCustomer", addCustomerData);

module.exports = router;
