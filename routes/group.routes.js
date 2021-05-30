module.exports = (app) => {
  const groups = require("../controllers/group.controller");
  const isAuth = require("../middlewares/auth.middleware");

  app.post("/users/:userId/groups", isAuth, groups.create);

  app.get("/groups/:groupId", isAuth, groups.findByGroupId);

  app.get("/users/:userId/groups", isAuth, groups.getAllByUserId);

  app.put("/groups/:groupId", isAuth, groups.updateByGroupId);

  app.delete("/groups/:groupId", isAuth, groups.deleteByGroupId);
};
