const { CREATE, GET_ALL_BY_STORE_ID, DELETE_BY_STORE_ID_AND_PRODUCT_ID } = require('../constants/store-product.constants');
const sql = require('./db');

const StoreProduct = function(storeProduct) {
    this.storeProductId = storeProduct.storeProductId;
    this.storeProductStoreId = storeProduct.storeProductStoreId;
    this.storeProductProductId = storeProduct.storeProductProductId;
}

StoreProduct.create = (storeProductStoreId, storeProduct, result) => {
    sql.query(
        CREATE,
        [storeProductStoreId, storeProduct.storeProductProductId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { storeProductId: res.insertId, storeProductStoreId, ...storeProduct });
        }
    );
};

StoreProduct.getAllByStoreId = (storeProductStoreId, result) => {
    sql.query(
        GET_ALL_BY_STORE_ID,
        storeProductStoreId,
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

StoreProduct.deleteByStoreIdAndProductId = (storeProductStoreId, storeProductProductId, result) => {
    sql.query(
        DELETE_BY_STORE_ID_AND_PRODUCT_ID,
        [storeProductStoreId, storeProductProductId],
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
            result(null, {storeProductStoreId, storeProductProductId});
        }
    );
}

module.exports = StoreProduct