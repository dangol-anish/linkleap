const dotenv = require("dotenv");
dotenv.config();
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

async function logCustomerActivity(
  customerId,
  eventType,
  lastStatus,
  changedBy
) {
  const loggerQuery =
    "insert into customer_logs (customer_id, event_type, last_status, changed_by) values ($1, $2, $3, $4) ";

  await pool.query(loggerQuery, [customerId, eventType, lastStatus, changedBy]);
}

const addCustomerData = async (req, res, next) => {
  const {
    customerName,
    customerEmail,
    customerCompany,
    customerJobTitle,
    customerDealValue,
    dealValueCurrency,
    customerDescription,
    customerStatus,
    userId,
  } = req.body;

  try {
    const checkExistingCustomerQuery =
      "SELECT customer_id FROM customers WHERE customer_email = $1";

    const checkExistingCustomerResult = await pool.query(
      checkExistingCustomerQuery,
      [customerEmail]
    );

    if (checkExistingCustomerResult.rowCount > 0) {
      return next(
        errorHandler(404, "Customer with this email already exists!")
      );
    }

    const insertNewCustomerQuery = `INSERT INTO customers 
        (customer_name, customer_email, customer_company, customer_job_title, customer_deal_currency, customer_deal_value, customer_description, customer_status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING customer_id`;

    const insertNewCustomerResult = await pool.query(insertNewCustomerQuery, [
      customerName,
      customerEmail,
      customerCompany,
      customerJobTitle,
      dealValueCurrency,
      customerDealValue,
      customerDescription,
      customerStatus,
    ]);

    const customerId = insertNewCustomerResult.rows[0].customer_id;

    if (insertNewCustomerResult.rowCount > 0) {
      const getCompanyIdQuery =
        "SELECT company_id FROM companies WHERE company_name = $1";

      const getCompanyIdResult = await pool.query(getCompanyIdQuery, [
        customerCompany,
      ]);

      const companyId = getCompanyIdResult.rows[0].company_id;

      const assignCustomerToCompanyQuery =
        "INSERT INTO company_customers (company_id, customer_id) VALUES ($1, $2)";

      await pool.query(assignCustomerToCompanyQuery, [companyId, customerId]);

      res.status(200).json({
        success: true,
        message: "New Customer Added!",
      });
      await logCustomerActivity(customerId, "INSERT", "Customer Added", userId);
    }
  } catch (error) {
    next(error);
  }
};

const getCustomerData = async (req, res, next) => {
  try {
    const getCustomerDataQuery = "select * from customers order by customer_id";

    const getCustomerDataResult = await pool.query(getCustomerDataQuery);

    if (getCustomerDataResult.rowCount > 0) {
      res.status(200).json({
        message: getCustomerDataResult.rows,
        success: true,
      });
    } else {
      res.status(200).json({
        message: "No customers available",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCustomerData = async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const deleteCustomerQuery = "delete from customers where customer_id = $1";
    const deleteCustomerResult = await pool.query(deleteCustomerQuery, [
      customerId,
    ]);

    if (deleteCustomerResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Customer successfully removed!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Failed to remove customer data!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getCurrentCustomerData = async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const getCurrentCustomerDataQuery =
      "select * from customers where customer_id = $1 ";

    const getCurrentCustomerDataResult = await pool.query(
      getCurrentCustomerDataQuery,
      [customerId]
    );

    if (getCurrentCustomerDataResult.rowCount > 0) {
      const customerData = getCurrentCustomerDataResult.rows[0];
      const {
        customer_name,
        customer_email,
        customer_company,
        customer_job_title,
        customer_deal_value,
        customer_deal_currency,
        customer_description,
        customer_status,
      } = customerData;
      const formattedData = {
        customerName: customer_name,
        customerEmail: customer_email,
        customerCompany: customer_company,
        customerJobTitle: customer_job_title,
        customerDealValue: customer_deal_value,
        dealValueCurrency: customer_deal_currency,
        customerDescription: customer_description,
        customerStatus: customer_status,
      };
      res.status(200).json({
        message: formattedData,
        success: true,
      });
    } else {
      res.status(200).json({
        message: "This customer doesnt exist!",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateCustomerData = async (req, res, next) => {
  const {
    customerName,
    customerEmail,
    customerCompany,
    customerJobTitle,
    customerDealValue,
    dealValueCurrency,
    customerDescription,
  } = req.body;

  const { customerId, userId } = req.params;

  try {
    const checkExistingCustomerQuery =
      "SELECT customer_id FROM customers WHERE customer_email = $1 AND customer_id != $2";

    const checkExistingCustomerResult = await pool.query(
      checkExistingCustomerQuery,
      [customerEmail, customerId]
    );

    if (checkExistingCustomerResult.rowCount > 0) {
      return next(
        errorHandler(409, "Customer with this email already exists!")
      );
    }

    const updateCustomerQuery =
      "UPDATE customers SET customer_name=$1, customer_email=$2, customer_company=$3, customer_job_title=$4, customer_deal_currency=$5, customer_deal_value=$6, customer_description=$7 WHERE customer_id=$8";

    const updateCustomerResult = await pool.query(updateCustomerQuery, [
      customerName,
      customerEmail,
      customerCompany,
      customerJobTitle,
      dealValueCurrency,
      customerDealValue,
      customerDescription,
      customerId,
    ]);

    if (updateCustomerResult.rowCount > 0) {
      const getCompanyIdQuery =
        "SELECT company_id FROM companies WHERE company_name = $1";

      const getCompanyIdResult = await pool.query(getCompanyIdQuery, [
        customerCompany,
      ]);

      if (getCompanyIdResult.rowCount > 0) {
        const companyId = getCompanyIdResult.rows[0].company_id;

        const updateCustomerToCompanyQuery =
          "UPDATE company_customers SET company_id=$1 WHERE customer_id=$2";

        await pool.query(updateCustomerToCompanyQuery, [companyId, customerId]);

        await logCustomerActivity(
          customerId,
          "UPDATE",
          "Customer Data Updated",
          userId
        );

        return res.status(200).json({
          success: true,
          message: "Customer Data Updated!",
        });
      } else {
        return next(errorHandler(404, "Company not found!"));
      }
    } else {
      return next(errorHandler(404, "Customer not found!"));
    }
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  const { customerId, selectedStatus } = req.params;

  try {
    const updateStatusQuery =
      "update customers set customer_status = $1 where customer_id=$2";

    const updateStatusResult = await pool.query(updateStatusQuery, [
      selectedStatus,
      customerId,
    ]);

    if (updateStatusResult.rowCount > 0) {
      res.status(200).json({
        message: "Success",
        message: "Status updated!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCustomerData,
  getCustomerData,
  deleteCustomerData,
  getCurrentCustomerData,
  updateCustomerData,
  changeStatus,
};
