module.exports = app => {
    const users = require("../controllers/user.controller");

    app.post("/users", users.create);

    app.get("/users/:userId", users.findById);

    app.get("/users", users.getAll);

    app.put("/users/:userId", users.updateById);

    app.delete("/users/:userId", users.deleteById);
}