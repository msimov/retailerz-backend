const { DELETE_BY_EXPIRED_TIME } = require("../constants/operation.constants");

module.exports = (cron) => {
  const sql = require("../models/db");

  cron.schedule("*/5 * * * *", () => {
    sql.query(DELETE_BY_EXPIRED_TIME);
  });
};
