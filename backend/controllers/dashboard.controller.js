const dotenv = require("dotenv");
dotenv.config();
const pool = require("../model/config.js");

const getDashboardData = async (req, res, next) => {
  try {
    const exchangeRates = {
      USD: 1,
      NPR: 0.0075,
      GBP: 1.42,
      EUR: 1.13,
    };

    let totalCompanies;
    let totalCustomers;
    let totalDealValueUSD = 0;

    const totalCompaniesQuery = "SELECT COUNT(company_id) FROM companies";
    const totalCompaniesResult = await pool.query(totalCompaniesQuery);
    if (totalCompaniesResult.rowCount > 0) {
      totalCompanies = totalCompaniesResult.rows[0].count;
    } else {
      totalCompanies = 0;
    }

    const totalCustomersQuery = "SELECT COUNT(customer_id) FROM customers";
    const totalCustomersResult = await pool.query(totalCustomersQuery);
    if (totalCustomersResult.rowCount > 0) {
      totalCustomers = totalCustomersResult.rows[0].count;
    } else {
      totalCustomers = 0;
    }

    const currencyQuery = `
      SELECT customer_deal_value, customer_deal_currency FROM customers
    `;
    const currencyResult = await pool.query(currencyQuery);
    if (currencyResult.rowCount > 0) {
      currencyResult.rows.forEach((row) => {
        const dealValue = parseFloat(row.customer_deal_value);
        const currency = row.customer_deal_currency.toUpperCase();
        let dealValueUSD = dealValue;
        if (currency !== "USD") {
          dealValueUSD = dealValue * exchangeRates[currency];
        }
        totalDealValueUSD += dealValueUSD;
      });
    }

    console.log("Total Deal Value in USD:", totalDealValueUSD);
    console.log("Total Companies:", totalCompanies);
    console.log("Total Customers:", totalCustomers);

    res.json({
      success: true,
      message: {
        totalCompanies,
        totalCustomers,
        totalDealValueUSD,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardData,
};
