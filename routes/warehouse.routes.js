module.exports = app => {
    const warehouses = require("../controllers/warehouse.controller");

    app.post("/warehouses", warehouses.create);

    app.get("/warehouses/:warehouseId", warehouses.findById);

    app.get("/warehouses", warehouses.getAll);

    app.put("/warehouses/:warehouseId", warehouses.updateById);

    app.delete("/warehouses/:warehouseId", warehouses.deleteById);
}