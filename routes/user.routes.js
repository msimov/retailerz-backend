module.exports = app => {
    const users = require("../controllers/user.controller");

    app.post("/users", users.create);

    app.get("/users", users.getAll);

    app.get("/users/:userId", users.findById);

    app.put("/users/:userId", users.updateById);

    app.delete("/users/:userId", users.deleteById);
}