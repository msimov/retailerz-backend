module.exports = app => {
    const activities = require("../controllers/activity.controller");

    app.post("/users/:userId/activities", activities.create);

}