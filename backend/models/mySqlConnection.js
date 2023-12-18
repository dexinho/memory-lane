const sql = require("mysql2/promise");

const connection = sql.createPool({
  host: "localhost",
  user: "root",
  password: 'root',
  database: "memory_lane",
});

module.exports = connection
