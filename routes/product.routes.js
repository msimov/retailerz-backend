module.exports = (app) => {
  const products = require("../controllers/product.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.get("/products", isAuth, products.search);

  app.post("/users/:userId/products", isAuth, products.create);

  app.get("/products/:productId", isAuth, products.findByProductId);

  app.get("/users/:userId/products", isAuth, products.getAllByUserId);

  app.get(
    "/users/:userId/products/recommended",
    isAuth,
    products.getAllRecommendedByUserId
  );

  app.put("/products/:productId", isAuth, products.updateByProductId);

  app.delete("/products/:productId", isAuth, products.deleteByProductId);
};
