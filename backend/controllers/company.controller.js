const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../model/config.js");
const { errorHandler } = require("../utils/errorHandler.js");

const getCompanyData = async (req, res, next) => {
  try {
    const getCompanyDataQuery = "select * from companies";

    const getCompanyDataResult = await pool.query(getCompanyDataQuery);

    if (getCompanyDataResult.rowCount > 0) {
      res.status(200).json({
        message: getCompanyDataResult.rows,
        success: true,
      });
    } else {
      res.status(200).json({
        message: "No companies available",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

const addCompanyData = async (req, res, next) => {
  const { companyName, companyWebsite, companyDescTitle, companyDesc } =
    req.body;

  try {
    const checkExistingCompanyQuery =
      "select company_website from companies where company_website = $1";

    const checkExistingCompanyResult = await pool.query(
      checkExistingCompanyQuery,
      [companyWebsite]
    );

    if (checkExistingCompanyResult.rowCount > 0) {
      return next(
        errorHandler(404, "Company with this website already exists!")
      );
    }

    const insertNewCompanyDataQuery =
      "insert into companies (company_name, company_website, company_description_title, company_description) values($1, $2, $3, $4)";

    const insertNewCompanyDataResult = await pool.query(
      insertNewCompanyDataQuery,
      [companyName, companyWebsite, companyDescTitle, companyDesc]
    );

    if (insertNewCompanyDataResult.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "New Company Added!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyData,
  addCompanyData,
};
