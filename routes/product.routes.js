module.exports = app => {
    const products = require("../controllers/product.controller");

    app.get("/products", products.findByKeyword);

    app.post("/users/:userId/products", products.create);

    app.get("/users/:userId/products/:productId", products.findById);

    app.get("/users/:userId/products", products.getAll);

    app.put("/users/:userId/products/:productId", products.updateById);

    app.delete("/users/:userId/products/:productId", products.deleteById);
}