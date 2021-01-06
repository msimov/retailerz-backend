const sql = require('./db');

const Store = function(store) {
    this.location = store.location;
}

Store.create = (userId, newStore, result) => {
    sql.query(
        `INSERT INTO stores (user , location) VALUES (?, ?)`,
        [userId, newStore.location],
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

Store.findById = (userId, storeId, result) => {
    sql.query(
        `SELECT * FROM stores WHERE user = ? AND id = ?`,
        [userId, storeId],
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

Store.updateById = (userId, storeId, store, result) => {
    sql.query(
        `UPDATE stores SET location = ?, user = ? WHERE user = ? AND id = ?`,
        [store.location, userId, userId, storeId],
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

            console.log("Updated store: ", {id: storeId, ...store}, " for user: ", userId);
            result(null, { storeId: storeId, ...store });
        }
    );
};

Store.deleteById = (userId, storeId, result) => {
    sql.query(
        `DELETE FROM stores WHERE user = ? AND id = ?`,
        [userId, storeId],
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
            console.log("Deleted store with id: ", storeId, " for user ", userId);
            result(null, storeId);
        }
    );
}

module.exports = Store