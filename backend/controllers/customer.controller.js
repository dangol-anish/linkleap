const dotenv = require("dotenv");
dotenv.config();
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

async function logCustomerActivity(
  customerId,
  eventType,
  oldValue,
  newValue,
  changedBy
) {
  const loggerQuery =
    "insert into customer_logs (customer_id, event_type, old_value, new_value, changed_by) values ($1, $2, $3, $4, $5) ";

  const loggerResult = await pool.query(loggerQuery, [
    customerId,
    eventType,
    oldValue,
    newValue,
    changedBy,
  ]);

  console.log("loggerResult", loggerResult);
}

const addCustomerData = async (req, res, next) => {
  const {
    customerName,
    customerEmail,
    customerCompany,
    customerJobTitle,
    customerDealValue,
    customerDescription,
    customerStatus,
    userId,
  } = req.body;

  try {
    const checkExistingCustomerQuery =
      "select customer_id from customers where customer_email = $1";

    const checkExistingCustomerResult = await pool.query(
      checkExistingCustomerQuery,
      [customerEmail]
    );

    if (checkExistingCustomerResult.rowCount > 0) {
      return next(
        errorHandler(404, "Customer with this email already exists!")
      );
    }

    const insertNewCustomerDataQuery =
      "insert into customers (customer_name, customer_email, customer_company, customer_job_title, customer_deal_value, customer_description, customer_status) values($1, $2, $3, $4, $5, $6, $7) returning customer_id";

    const insertNewCustomerDataResult = await pool.query(
      insertNewCustomerDataQuery,
      [
        customerName,
        customerEmail,
        customerCompany,
        customerJobTitle,
        customerDealValue,
        customerDescription,
        customerStatus,
      ]
    );

    const returningCustomerId = insertNewCustomerDataResult.rows[0].customer_id;

    console.log("Customer Id", returningCustomerId);

    if (insertNewCustomerDataResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "New Customer Added!",
      });
    }

    await logCustomerActivity(
      returningCustomerId,
      "INSERT",
      null,
      "Customer Added",
      userId
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { addCustomerData };
