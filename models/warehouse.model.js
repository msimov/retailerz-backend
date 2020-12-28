const sql = require('./db');

const Warehouse = function(warehouse) {
    this.location = warehouse.location;
    this.user = warehouse.user;
};

Warehouse.create = (newWarehouse, result) => {
    sql.query(
        `INSERT INTO warehouses (location , user) VALUES (?, ?)`,
        [newWarehouse.location, newWarehouse.user],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created warehouse: ", { id: res.insertId, ...newWarehouse });
            result(null, { id: res.insertId, ...newWarehouse });
        }
    );
};

Warehouse.findById = (warehouseId, result) => {
    sql.query(
        `SELECT * FROM warehouses WHERE id = ?`,
        warehouseId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                console.log("Found warehouse: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

Warehouse.getAll = result => {
    sql.query(
        "SELECT * FROM warehouses",
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Warehouses: ", res);
            result(null, res);
        }
    );
};

Warehouse.updateById = (id, warehouse, result) => {
    sql.query(
        `UPDATE warehouses SET location = ?, user = ? WHERE id = ?`,
        [warehouse.location, warehouse.user, id],
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

            console.log("Updated warehouse: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

Warehouse.deleteById = (id, result) => {
    sql.query(
        `DELETE FROM warehouses WHERE id = ?`,
         id,
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
            console.log("Deleted warehouse with id: ", id);
            result(null, id);
        }
    );
}

module.exports = Warehouse