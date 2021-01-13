const sql = require('./db');

const StoreProduct = function(storeProduct) {
    this.productId = storeProduct.productId;
}

StoreProduct.create = (userId, storeId, storeProduct, result) => {
    sql.query(
        `INSERT INTO stores_products (userId, storeId , productId) VALUES (?, ?, ?)`,
        [userId, storeId, storeProduct.productId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, storeId, ...storeProduct });
        }
    );
};

StoreProduct.getAllByStoreId = (userId, storeId, result) => {
    sql.query(
        `SELECT * FROM stores_products WHERE userId = ? AND storeId = ?`,
        [userId, storeId],
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

StoreProduct.deleteByStoreIdAndProductId = (userId, storeId, productId, result) => {
    sql.query(
        `DELETE FROM stores_products WHERE userId = ? AND storeId = ? AND productId = ?`,
        [userId, storeId, productId],
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
            result(null, {storeId, productId});
        }
    );
}

module.exports = StoreProduct