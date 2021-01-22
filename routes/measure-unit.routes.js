module.exports = app => {
    const measureUnits = require("../controllers/measure-unit.controller");

    app.post("/users/:userId/measure-units", measureUnits.create);

    app.get("/measure-units/:measureUnitId", measureUnits.findByMeasureUnitId);

    app.get("/users/:userId/measure-units", measureUnits.getAllByUserId);

    app.put("/measure-units/:measureUnitId", measureUnits.updateByMeasureUnitId);

    app.delete("/measure-units/:measureUnitId", measureUnits.deleteByMeasureUnitId);
}