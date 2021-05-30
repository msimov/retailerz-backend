module.exports = (app) => {
  const storesProducts = require("../controllers/store-product.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/stores/:storeId/products", isAuth, storesProducts.create);

  app.get("/stores/:storeId/products", isAuth, storesProducts.getAllByStoreId);

  app.get(
    "/products/:productId/stores",
    isAuth,
    storesProducts.getAllByProductId
  );

  app.delete(
    "/stores/:storeId/products/:productId",
    isAuth,
    storesProducts.deleteByStoreIdAndProductId
  );
};
