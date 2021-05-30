module.exports = (app) => {
  const measureUnits = require("../controllers/measure-unit.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/users/:userId/measure-units", isAuth, measureUnits.create);

  app.get(
    "/measure-units/:measureUnitId",
    isAuth,
    measureUnits.findByMeasureUnitId
  );

  app.get("/users/:userId/measure-units", isAuth, measureUnits.getAllByUserId);

  app.put(
    "/measure-units/:measureUnitId",
    isAuth,
    measureUnits.updateByMeasureUnitId
  );

  app.delete(
    "/measure-units/:measureUnitId",
    isAuth,
    measureUnits.deleteByMeasureUnitId
  );
};
