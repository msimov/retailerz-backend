module.exports = (app) => {
  const operations = require("../controllers/operation.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/users/:userId/operations", isAuth, operations.create);

  app.get("/operations/:operationId", isAuth, operations.findByOperationId);

  app.get("/users/:userId/operations", isAuth, operations.getAllByUserId);

  app.get(
    "/users/:userId/operations/:operationTypeId",
    isAuth,
    operations.getAllByUserIdAndOperationTypeId
  );

  app.get("/users/:userId/inventory", isAuth, operations.getInventory);

  app.put("/operations/:operationId", isAuth, operations.updateByOperationId);

  app.delete(
    "/operations/:operationId",
    isAuth,
    operations.deleteByOperationId
  );
};
