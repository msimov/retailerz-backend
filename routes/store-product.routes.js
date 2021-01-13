module.exports = app => {
    const storesProducts = require("../controllers/store-product.controller");

    app.post("/users/:userId/stores/:storeId/products", storesProducts.create);

    app.get("/users/:userId/stores/:storeId/products", storesProducts.getAllByStoreId);

    app.delete("/users/:userId/stores/:storeId/products/:productId", storesProducts.deleteByProductId);
}