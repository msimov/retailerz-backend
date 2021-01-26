const { CREATE, FIND_BY_OPERATION_ID, GET_ALL_BY_USER_ID, GET_ALL_BY_USER_ID_AND_OPERATION_TYPE_ID, UPDATE_BY_OPERATION_ID, DELETE_BY_OPERATION_ID } = require('../constants/operation.constants');
const sql = require('./db');

const Operation = function(operation) {
    this.operationId = operation.operationId;
    this.operationUserId = operation.operationUserId;
    this.operationProductId = operation.operationProductId;
    this.operationCount = operation.operationCount;
    this.operationOperationTypeId = operation.operationOperationTypeId;
    this.operationStoreId = operation.operationStoreId;
};

Operation.create = (operationUserId, operation, result) => {
    sql.query(
        CREATE,
        [operationUserId, operation.operationProductId, operation.operationCount, operation.operationOperationTypeId, operation.operationStoreId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { operationId: res.insertId, operationUserId, ...operation });
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

Operation.getAllByUserId = (operationUserId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
        operationUserId,
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

Operation.getAllByUserIdAndOperationTypeId = (operationUserId, operationTypeId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID_AND_OPERATION_TYPE_ID,
        [operationUserId, operationTypeId],
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
        [operation.operationProductId, operation.operationCount, operation.operationOperationTypeId, operation.operationStoreId, operationId],
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