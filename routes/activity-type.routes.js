module.exports = (app) => {
  const activityTypes = require("../controllers/activity-type.controller");

  app.get("/activity-types", activityTypes.getAll);
};
