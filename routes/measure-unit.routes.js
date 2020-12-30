module.exports = app => {
    const measureUnits = require("../controllers/measure-unit.controller");

    app.post("/users/:userId/measure-units", measureUnits.create);

    app.get("/users/:userId/measure-units/:measureUnitId", measureUnits.findById);

    app.get("/users/:userId/measure-units", measureUnits.getAll);

    app.put("/users/:userId/measure-units/:measureUnitId", measureUnits.updateById);

    app.delete("/users/:userId/measure-units/:measureUnitId", measureUnits.deleteById);
}