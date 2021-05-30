module.exports = (app) => {
  const operationTypes = require("../controllers/operation-type.controller");

  app.get(
    "/operation-types/:operationTypeId",
    operationTypes.findByOperationTypeId
  );

  app.get("/operation-types", operationTypes.getAll);
};
