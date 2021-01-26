const { CREATE, FIND_BY_MEASURE_UNIT_ID, GET_ALL_BY_USER_ID, UPDATE_BY_MEASURE_UNIT_ID, DELETE_BY_MEASURE_UNIT_ID } = require('../constants/measure-unit.constants');
const sql = require('./db');

const MeasureUnit = function(measureUnit) {
    this.measureUnitId = measureUnit.measureUnitId;
    this.measureUnitName = measureUnit.measureUnitName;
};

MeasureUnit.create = (measureUnitUserId, measureUnit, result) => {
    sql.query(
        CREATE,
        [measureUnitUserId, measureUnit.measureUnitName],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { measureUnitId: res.insertId, measureUnitUserId, ...measureUnit });
        }
    );
};

MeasureUnit.findByMeasureUnitId = (measureUnitId, result) => {
    sql.query(
        FIND_BY_MEASURE_UNIT_ID,
        measureUnitId,
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

MeasureUnit.getAllByUserId = (measureUnitUserId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
        measureUnitUserId,
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

MeasureUnit.updateByMeasureUnitId = (measureUnitId, measureUnit, result) => {
    sql.query(
        UPDATE_BY_MEASURE_UNIT_ID,
        [measureUnit.measureUnitName, measureUnitId],
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
            result(null, { measureUnitId, ...measureUnit });
        }
    );
};

MeasureUnit.deleteByMeasureUnitId = (measureUnitId, result) => {
    sql.query(
        DELETE_BY_MEASURE_UNIT_ID,
        measureUnitId,
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
            result(null, measureUnitId);
        }
    );
}

module.exports = MeasureUnit