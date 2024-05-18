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

    const recentDataQuery = `
      SELECT total_companies, total_customers, total_deal_value_usd
      FROM dashboard_data
      ORDER BY last_updated DESC
      LIMIT 1;
    `;
    const recentDataResult = await pool.query(recentDataQuery);

    let shouldInsert = true;

    if (recentDataResult.rowCount > 0) {
      const recentData = recentDataResult.rows[0];

      if (
        recentData.total_companies == totalCompanies &&
        recentData.total_customers == totalCustomers &&
        recentData.total_deal_value_usd == totalDealValueUSD
      ) {
        shouldInsert = false;
      }
    }

    if (shouldInsert) {
      const upsertQuery = `
        INSERT INTO dashboard_data (total_companies, total_customers, total_deal_value_usd, last_updated)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        ON CONFLICT (dd_id) DO UPDATE
        SET total_companies = EXCLUDED.total_companies,
            total_customers = EXCLUDED.total_customers,
            total_deal_value_usd = EXCLUDED.total_deal_value_usd,
            last_updated = EXCLUDED.last_updated;
      `;
      await pool.query(upsertQuery, [
        totalCompanies,
        totalCustomers,
        totalDealValueUSD,
      ]);
    }

    const dataHistoryQuery = "select * from dashboard_data";
    const dataHistoryResult = await pool.query(dataHistoryQuery);

    res.json({
      success: true,
      message: {
        totalCompanies,
        totalCustomers,
        totalDealValueUSD,
      },
      data: dataHistoryResult.rows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardData,
};
