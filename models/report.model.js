const {
  TOTAL_PROFIT,
  TOTAL_PROFIT_FOR_STORE,
  MOST_SEARCHED_PRODUCTS,
  SALES_BY_DATES,
  SALES_BY_DATES_FOR_STORE,
  TOTAL_PROFIT_FOR_PRODUCT,
  TOTAL_PROFIT_FOR_PRODUCT_FOR_STORE,
  QUANTITY_SOLD_FOR_PRODUCT_FOR_STORE,
  QUANTITY_SOLD_FOR_PRODUCT,
  DELIVERIES_BY_PRODUCT_GROUP,
} = require("../constants/reports.constants");

const sql = require("./db");

const Report = function (report) {
  this.limit = report.limit;
};

Report.totalProfit = (userId, result) => {
  sql.query(TOTAL_PROFIT, userId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(null, { totalProfit: null });
  });
};

Report.totalProfitForStore = (userId, storeId, result) => {
  sql.query(TOTAL_PROFIT_FOR_STORE, [userId, storeId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(null, { totalProfit: null });
  });
};

Report.totalProfitForProduct = (userId, productId, result) => {
  sql.query(TOTAL_PROFIT_FOR_PRODUCT, [userId, productId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(null, { totalProfit: null });
  });
};

Report.totalProfitForProductForStore = (userId, storeId, productId, result) => {
  sql.query(
    TOTAL_PROFIT_FOR_PRODUCT_FOR_STORE,
    [userId, storeId, productId],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result(null, { totalProfit: null });
    }
  );
};

Report.mostSearchedProducts = (userId, result) => {
  sql.query(MOST_SEARCHED_PRODUCTS, userId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Report.salesByDates = (userId, result) => {
  sql.query(SALES_BY_DATES, userId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Report.salesByDatesForStore = (userId, storeId, result) => {
  sql.query(SALES_BY_DATES_FOR_STORE, [userId, storeId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Report.quantitySoldForProduct = (userId, productId, result) => {
  sql.query(QUANTITY_SOLD_FOR_PRODUCT, [userId, productId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(null, { sales: null });
  });
};

Report.quantitySoldForProductForStore = (
  userId,
  storeId,
  productId,
  result
) => {
  sql.query(
    QUANTITY_SOLD_FOR_PRODUCT_FOR_STORE,
    [userId, storeId, productId],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result(null, { sales: null });
    }
  );
};

Report.deliveriesByProductGroup = (userId, productId, result) => {
  sql.query(DELIVERIES_BY_PRODUCT_GROUP, [userId, productId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result(null, { deliveries: null });
  });
};

module.exports = Report;
