const { CREATE, FIND_BY_OPERATION_ID, GET_ALL_BY_USER_ID, GET_ALL_BY_USER_ID_AND_OPERATION_TYPE_ID, UPDATE_BY_OPERATION_ID, DELETE_BY_OPERATION_ID } = require('../constants/operation.constants');
const sql = require('./db');

const Operation = function(operation) {
    this.operationId = operation.operationId;
    this.userId = operation.userId;
    this.productId = operation.operationType;
    this.count = operation.store;
    this.operationTypeId = operation.product;
    this.storeId = operation.count;
};

Operation.create = (userId, operation, result) => {
    sql.query(
        CREATE,
        [userId, operation.productId, operation.count, operation.operationTypeId, operation.storeId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { operationId: res.insertId, ...operation });
        }
    );
};

Operation.findByOperationId = (operationId, result) => {
    sql.query(
        FIND_BY_OPERATION_ID,
        operationId,
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

Operation.getAllByUserId = (userId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
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

Operation.getAllByUserIdAndOperationTypeId = (userId, operationTypeId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID_AND_OPERATION_TYPE_ID,
        [userId, operationTypeId],
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

Operation.updateByOperationId = (operationId, operation, result) => {
    sql.query(
        UPDATE_BY_OPERATION_ID,
        [operation.productId, operation.count, operation.operationTypeId, operation.storeId, operationId],
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

Operation.deleteByOperationId = (operationId, result) => {
    sql.query(
        DELETE_BY_OPERATION_ID,
        operationId,
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
            result(null, operationId);
        }
    );
}

module.exports = Operation