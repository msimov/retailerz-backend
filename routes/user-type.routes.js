module.exports = app => {
    const userTypes = require("../controllers/user-type.controller");


    app.get("/user-types/:userTypeId", userTypes.findById);

    app.get("/user-types", userTypes.getAll);

}