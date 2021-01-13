const sql = require('./db');

const Operation = function(operation) {
    this.product = operation.product;
    this.operationType = operation.operationType;
    this.count = operation.count;
};

Operation.create = (userId, newOperation, result) => {
    sql.query(
        `INSERT INTO operations (user, product, operationType, count) VALUES (?, ?, ?, ?)`,
        [userId, newOperation.product, newOperation.operationType, newOperation.count],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newOperation });
        }
    );
};

Operation.findById = (userId, operationId, result) => {
    sql.query(
        `SELECT * FROM operations WHERE user = ? AND id = ?`,
        [userId, operationId],
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

Operation.getAll = (userId, result) => {
    sql.query(
        "SELECT * FROM operations WHERE user = ?",
        userId,
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

Operation.updateById = (userId, operationId, operation, result) => {
    sql.query(
        `UPDATE operations SET count = ?, product = ?, operationType = ? WHERE user = ? AND id = ?`,
        [operation.count, operation.product, operation.operationType, userId, operationId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { operationId, ...operation });
        }
    );
};

Operation.deleteById = (userId, operationId, result) => {
    sql.query(
        `DELETE FROM operations WHERE user = ? AND id = ?`,
        [userId, operationId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, id);
        }
    );
}

module.exports = Operation