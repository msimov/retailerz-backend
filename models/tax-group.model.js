const sql = require('./db');

const TaxGroup = function(taxGroup) {
    this.percentage = taxGroup.percentage;
};

TaxGroup.findById = (taxGroupId, result) => {
    sql.query(
        `SELECT * FROM tax_groups WHERE id = ?`,
        taxGroupId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                console.log("Found tax group: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

TaxGroup.getAll = result => {
    sql.query(
        "SELECT * FROM tax_groups",
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Tax groups: ", res);
            result(null, res);
        }
    );
};

module.exports = TaxGroup