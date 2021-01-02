const sql = require('./db');

const Operation = function(operation) {
    this.product = operation.product;
    this.operation = operation.operation;
    this.count = operation.count;
};

Operation.create = (userId, newOperation, result) => {
    sql.query(
        `INSERT INTO operations (user, product, operation, count) VALUES (?, ?, ?, ?)`,
        [userId, newOperation.product, newOperation.operation, newOperation.count],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Created operation: ", {id: res.insertId, ...newOperation}, " for user: ", userId);
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
                console.log("Found OPERATION: ", res[0], " for user: ", userId);
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
            
            console.log("Found Stocks: ", res, " for user: ", userId);
            result(null, res);
        }
    );
};

Operation.updateById = (userId, stockId, operation, result) => {
    sql.query(
        `UPDATE operations SET count = ?, product = ?, operation = ? WHERE user = ? AND id = ?`,
        [operation.product, operation.count, operation.operation, userId, stockId],
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

            console.log("Updated operation: ", {id: stockId, ...operation}, " for user: ", userId);
            result(null, { stockId, ...operation });
        }
    );
};

Operation.deleteById = (userId, stockId, result) => {
    sql.query(
        `DELETE FROM operations WHERE user = ? AND id = ?`,
        [userId, stockId],
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
            console.log("Deleted operation with id: ", stockId, " for user ", userId);
            result(null, id);
        }
    );
}

module.exports = Operation