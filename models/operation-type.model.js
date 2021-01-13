const sql = require('./db');

const OperationType = function(operationType) {
    this.type = operationType.type;
};

OperationType.findById = (operationTypeId, result) => {
    sql.query(
        `SELECT * FROM operation_types WHERE id = ?`,
        operationTypeId,
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

OperationType.getAll = result => {
    sql.query(
        "SELECT * FROM operation_types",
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

module.exports = OperationType