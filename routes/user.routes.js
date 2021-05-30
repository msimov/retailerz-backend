module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/users", isAuth, users.create);

  app.get("/users/:userId", isAuth, users.findByUserId);

  app.get("/users", isAuth, users.getAll);

  app.put("/users/:userId", isAuth, users.updateByUserId);

  app.delete("/users/:userId", isAuth, users.deleteByUserId);
};
