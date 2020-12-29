const sql = require('./db');

const Store = function(store) {
    this.location = store.location;
    this.warehouse = store.warehouse;
};

Store.create = (userId, newStore, result) => {
    sql.query(
        `INSERT INTO stores (user , location, warehouse) VALUES (?, ?, ?)`,
        [userId, newStore.location, newStore.warehouse],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created store: ", {id: res.insertId, ...newStore}, " for user: ", userId);
            result(null, { id: res.insertId, ...newStore });
        }
    );
};

Store.findById = (userId, warehouseId, result) => {
    sql.query(
        `SELECT * FROM stores WHERE user = ? AND id = ?`,
        [userId, warehouseId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                console.log("Found store: ", res[0], " for user: ", userId);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

Store.getAll = (userId, result) => {
    sql.query(
        "SELECT * FROM stores WHERE user = ?",
        userId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Found Stores: ", res, " for user: ", userId);
            result(null, res);
        }
    );
};

Store.updateById = (userId, warehouseId, store, result) => {
    sql.query(
        `UPDATE stores SET location = ?, user = ?, warehouse = ? WHERE user = ? AND id = ?`,
        [store.location, store.user, store.warehouse, userId, warehouseId],
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

            console.log("Updated store: ", {id: warehouseId, ...store}, " for user: ", userId);
            result(null, { warehouseId: warehouseId, ...store });
        }
    );
};

Store.deleteById = (userId, warehouseId, result) => {
    sql.query(
        `DELETE FROM stores WHERE user = ? AND id = ?`,
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
            console.log("Deleted store with id: ", warehouseId, " for user ", userId);
            result(null, id);
        }
    );
}

module.exports = Store