const { CREATE, GET_ALL_BY_STORE_ID, DELETE_BY_STORE_ID_AND_PRODUCT_ID } = require('../constants/store-product.constants');
const sql = require('./db');

const StoreProduct = function(storeProduct) {
    this.storeProductId = storeProduct.storeProductId;
    this.storeId = storeProduct.storeId;
    this.productId = storeProduct.productId;
}

StoreProduct.create = (storeId, storeProduct, result) => {
    sql.query(
        CREATE,
        [storeId, storeProduct.productId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { storeProductId: res.insertId, storeId, ...storeProduct });
        }
    );
};

StoreProduct.getAllByStoreId = (storeId, result) => {
    sql.query(
        GET_ALL_BY_STORE_ID,
        storeId,
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

StoreProduct.deleteByStoreIdAndProductId = (storeId, productId, result) => {
    sql.query(
        DELETE_BY_STORE_ID_AND_PRODUCT_ID,
        [storeId, productId],
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