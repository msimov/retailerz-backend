module.exports = app => {
    const taxGroups = require("../controllers/tax-group.controller");


    app.get("/tax-groups/:taxGroupId", taxGroups.findByTaxGroupId);

    app.get("/tax-groups", taxGroups.getAll);

}