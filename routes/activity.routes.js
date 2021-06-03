module.exports = (app) => {
  const activities = require("../controllers/activity.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/users/:userId/activities", isAuth, activities.create);

  app.get("/users/:userId/activities", isAuth, activities.getAllByUserId);
};
