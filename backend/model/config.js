const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "0000",
  database: "linkleap",
  host: "localhost",
  port: 5434,
});

module.exports = pool;
