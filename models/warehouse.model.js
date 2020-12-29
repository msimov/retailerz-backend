const sql = require('./db');

const Warehouse = function(warehouse) {
    this.location = warehouse.location;
};

Warehouse.create = (userId, newWarehouse, result) => {
    sql.query(
        `INSERT INTO warehouses (user , location) VALUES (?, ?)`,
        [userId, newWarehouse.location],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created warehouse: ", {id: res.insertId, ...newWarehouse}, " for user: ", userId);
            result(null, { id: res.insertId, ...newWarehouse });
        }
    );
};

Warehouse.findById = (userId, warehouseId, result) => {
    sql.query(
        `SELECT * FROM warehouses WHERE user = ? AND id = ?`,
        [userId, warehouseId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                console.log("Found warehouse: ", res[0], " for user: ", userId);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

Warehouse.getAll = (userId, result) => {
    sql.query(
        "SELECT * FROM warehouses WHERE user = ?",
        userId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Found Warehouses: ", res, " for user: ", userId);
            result(null, res);
        }
    );
};

Warehouse.updateById = (userId, warehouseId, warehouse, result) => {
    sql.query(
        `UPDATE warehouses SET location = ?, user = ? WHERE user = ? AND id = ?`,
        [warehouse.location, warehouse.user, userId, warehouseId],
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

            console.log("Updated warehouse: ", {id: warehouseId, ...warehouse}, " for user: ", userId);
            result(null, { warehouseId: warehouseId, ...warehouse });
        }
    );
};

Warehouse.deleteById = (userId, warehouseId, result) => {
    sql.query(
        `DELETE FROM warehouses WHERE user = ? AND id = ?`,
        [userId, warehouseId],
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
            console.log("Deleted warehouse with id: ", warehouseId, " for user ", userId);
            result(null, id);
        }
    );
}

module.exports = Warehouse