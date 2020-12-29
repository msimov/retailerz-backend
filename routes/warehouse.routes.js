module.exports = app => {
    const warehouses = require("../controllers/warehouse.controller");

    app.post("/users/:userId/warehouses", warehouses.create);

    app.get("/users/:userId/warehouses/:warehouseId", warehouses.findById);

    app.get("/users/:userId/warehouses", warehouses.getAll);

    app.put("/users/:userId/warehouses/:warehouseId", warehouses.updateById);

    app.delete("/users/:userId/warehouses/:warehouseId", warehouses.deleteById);
}