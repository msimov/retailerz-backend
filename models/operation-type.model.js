const { FIND_BY_OPERATION_TYPE_ID, GET_ALL } = require('../constants/operation-type.constants');
const sql = require('./db');

const OperationType = function(operationType) {
    this.operationTypeId = operationType.operationTypeId;
    this.operationTypeName = operationType.operationTypeName;
};

OperationType.findByOperationTypeId = (operationTypeId, result) => {
    sql.query(
        FIND_BY_OPERATION_TYPE_ID,
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

module.exports = OperationType