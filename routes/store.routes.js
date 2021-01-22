module.exports = app => {
    const stores = require("../controllers/store.controller");

    app.post("/users/:userId/stores", stores.create);

    app.get("/stores/:storeId", stores.findByStoreId);

    app.get("/users/:userId/stores", stores.getAllByUserId);

    app.put("/stores/:storeId", stores.updateByStoreId);

    app.delete("/stores/:storeId", stores.deleteByStoreId);
}