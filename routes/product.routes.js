module.exports = app => {
    const products = require("../controllers/product.controller");

    app.post("/products", products.create);

    app.get("/products/:productId", products.findById);

    app.get("/products", products.getAll);

    app.put("/products/:productId", products.updateById);

    app.delete("/products/:productId", products.deleteById);
}