module.exports = (app) => {
  const reports = require("../controllers/report.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.get("/users/:userId/total-profit", isAuth, reports.totalProfit);

  app.get(
    "/users/:userId/stores/:storeId/total-profit",
    isAuth,
    reports.totalProfitForStore
  );

  app.get(
    "/users/:userId/products/:productId/profit",
    isAuth,
    reports.totalProfitForProduct
  );

  app.get(
    "/users/:userId/stores/:storeId/products/:productId/profit",
    isAuth,
    reports.totalProfitForProductForStore
  );

  app.get(
    "/users/:userId/products/most-searched",
    isAuth,
    reports.mostSearchedProducts
  );

  app.get("/users/:userId/sales-by-dates", isAuth, reports.salesByDates);

  app.get(
    "/users/:userId/stores/:storeId/sales-by-dates",
    isAuth,
    reports.salesByDatesForStore
  );

  app.get(
    "/users/:userId/products/:productId/quantity-sold",
    isAuth,
    reports.quantitySoldForProduct
  );

  app.get(
    "/users/:userId/stores/:storeId/products/:productId/quantity-sold",
    isAuth,
    reports.quantitySoldForProductForStore
  );

  app.get(
    "/users/:userId/groups/:groupId/deliveries",
    isAuth,
    reports.deliveriesByProductGroup
  );
};
