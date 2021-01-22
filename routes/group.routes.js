module.exports = app => {
    const groups = require("../controllers/group.controller");

    app.post("/users/:userId/groups", groups.create);

    app.get("/groups/:groupId", groups.findByGroupId);

    app.get("/users/:userId/groups", groups.getAllByUserId);

    app.put("/groups/:groupId", groups.updateByGroupId);

    app.delete("/groups/:groupId", groups.deleteByGroupId);
}