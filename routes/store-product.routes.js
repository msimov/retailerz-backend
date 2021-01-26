module.exports = app => {
    const storesProducts = require("../controllers/store-product.controller");

    app.post("/stores/:storeId/products", storesProducts.create);

    app.get("/stores/:storeId/products", storesProducts.getAllByStoreId);

    app.get("/products/:productId/stores", storesProducts.getAllByProductId);

    app.delete("/stores/:storeId/products/:productId", storesProducts.deleteByStoreIdAndProductId);
}