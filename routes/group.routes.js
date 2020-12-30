module.exports = app => {
    const groups = require("../controllers/group.controller");

    app.post("/users/:userId/groups", groups.create);

    app.get("/users/:userId/groups/:groupId", groups.findById);

    app.get("/users/:userId/groups", groups.getAll);

    app.put("/users/:userId/groups/:groupId", groups.updateById);

    app.delete("/users/:userId/groups/:groupId", groups.deleteById);
}