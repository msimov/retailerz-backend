module.exports = app => {
    const operations = require("../controllers/operation.controller");

    app.post("/users/:userId/operations", operations.create);

    app.get("/operations/:operationId", operations.findByOperationId);

    app.get("/users/:userId/operations", operations.getAllByUserId);

    app.get("/users/:userId/operations", operations.getAllByUserIdAndOperationTypeId);

    app.put("/operations/:operationId", operations.updateByOperationId);

    app.delete("/operations/:operationId", operations.deleteByOperationId);
}