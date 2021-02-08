module.exports = app => {
    const products = require("../controllers/product.controller");

    app.get("/products", products.findByKeyword);

    app.post("/users/:userId/products", products.create);

    app.get("/products/:productId", products.findByProductId);

    app.get("/users/:userId/products", products.getAllByUserId);

    app.get("/users/:userId/products/recommended", products.getAllRecommendedByUserId);

    app.put("/products/:productId", products.updateByProductId);

    app.delete("/products/:productId", products.deleteByProductId);
}