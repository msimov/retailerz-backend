module.exports = (app) => {
  const stores = require("../controllers/store.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/users/:userId/stores", isAuth, stores.create);

  app.get("/stores/:storeId", isAuth, stores.findByStoreId);

  app.get("/users/:userId/stores", isAuth, stores.getAllByUserId);

  app.put("/stores/:storeId", isAuth, stores.updateByStoreId);

  app.delete("/stores/:storeId", isAuth, stores.deleteByStoreId);
};
