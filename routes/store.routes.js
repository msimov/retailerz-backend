module.exports = app => {
    const stores = require("../controllers/store.controller");

    app.post("/users/:userId/stores", stores.create);

    app.get("/users/:userId/stores/:storeId", stores.findById);

    app.get("/users/:userId/stores", stores.getAll);

    app.put("/users/:userId/stores/:storeId", stores.updateById);

    app.delete("/users/:userId/stores/:storeId", stores.deleteById);
}