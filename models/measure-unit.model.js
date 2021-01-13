const sql = require('./db');

const MeasureUnit = function(measureUnit) {
    this.unit = measureUnit.unit;
};

MeasureUnit.create = (userId, newMeasureUnit, result) => {
    sql.query(
        `INSERT INTO measure_units (user , unit) VALUES (?, ?)`,
        [userId, newMeasureUnit.unit],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newMeasureUnit });
        }
    );
};

MeasureUnit.findById = (userId, measureUnitId, result) => {
    sql.query(
        `SELECT * FROM measure_units WHERE user = ? AND id = ?`,
        [userId, measureUnitId],
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

MeasureUnit.getAll = (userId, result) => {
    sql.query(
        "SELECT * FROM measure_units WHERE user = ?",
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

MeasureUnit.updateById = (userId, measureUnitId, measureUnit, result) => {
    sql.query(
        `UPDATE measure_units SET unit = ? WHERE user = ? AND id = ?`,
        [measureUnit.unit, userId, measureUnitId],
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

MeasureUnit.deleteById = (userId, measureUnitId, result) => {
    sql.query(
        `DELETE FROM measure_units WHERE user = ? AND id = ?`,
        [userId, measureUnitId],
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