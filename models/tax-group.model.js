const { FIND_BY_TAX_GROUP_ID, GET_ALL } = require('../constants/tax-group.constants');
const sql = require('./db');

const TaxGroup = function(taxGroup) {
    this.taxGroupId = taxGroup.taxGroupId;
    this.taxGroupPercentage = taxGroup.taxGroupPercentage;
};

TaxGroup.findByTaxGroupId = (taxGroupId, result) => {
    sql.query(
        FIND_BY_TAX_GROUP_ID,
        taxGroupId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.length) {
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
        }
    );
};

TaxGroup.getAll = result => {
    sql.query(
        GET_ALL,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

module.exports = TaxGroup