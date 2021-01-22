module.exports = app => {
    const users = require("../controllers/user.controller");

    app.post("/users", users.create);

    app.get("/users/:userId", users.findByUserId);

    app.get("/users", users.getAll);

    app.put("/users/:userId", users.updateByUserId);

    app.delete("/users/:userId", users.deleteByUserId);
}