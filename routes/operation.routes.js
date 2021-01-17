module.exports = app => {
    const operations = require("../controllers/operation.controller");

    app.post("/users/:userId/operations", operations.create);

    app.get("/users/:userId/operations/:operationId", operations.findById);

    app.get("/users/:userId/operations", operations.getAll);

    app.get("/users/:userId/operations", operations.getAllByOperationType);

    app.put("/users/:userId/operations/:operationId", operations.updateById);

    app.delete("/users/:userId/operations/:operationId", operations.deleteById);
}