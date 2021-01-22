module.exports = app => {
    const userTypes = require("../controllers/user-type.controller");


    app.get("/user-types/:userTypeId", userTypes.findByUserTypeId);

    app.get("/user-types", userTypes.getAll);

}