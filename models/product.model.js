const { CREATE, FIND_BY_PRODUCT_ID, SEARCH, GET_ALL_BY_USER_ID, UPDATE_BY_PRODUCT_ID, DELETE_BY_PRODUCT_ID, GET_ALL_RECOMMENDED_BY_USER_ID } = require('../constants/product.constants');
const sql = require('./db');

const Product = function(product) {
    this.productId = product.productId;
    this.productUserId = product.productUserId;
    this.productGroupId = product.productGroupId;
    this.productCode = product.productCode;
    this.productBarcode = product.productBarcode;
    this.productMeasureUnitId = product.productMeasureUnitId;
    this.productTaxGroupId = product.productTaxGroupId;
    this.proudctRetailPrice = product.proudctRetailPrice;
    this.productDeliveryPrice = product.productDeliveryPrice;
    this.productName = product.productName;
    this.productDescription = product.productDescription;
};

Product.create = (operationUserId, product, result) => {
    sql.query(
        CREATE,
        [
            operationUserId, product.productGroupId, product.productCode, product.productBarcode, product.productMeasureUnitId, 
            product.productTaxGroupId, product.productRetailPrice, product.productDeliveryPrice, product.productName, product.productDescription
        ],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { productId: res.insertId, operationUserId, ...product });
        }
    );
};

Product.findByProductId = (productId, result) => {
    sql.query(
        FIND_BY_PRODUCT_ID,
        productId,
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

Product.search = (search, result) => {
    sql.query(
        SEARCH(search),
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

Product.getAllByUserId = (operationUserId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
        operationUserId,
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

Product.getAllRecommendedByUserId = (userId, result) => {
    sql.query(
        GET_ALL_RECOMMENDED_BY_USER_ID(userId),
        (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

Product.updateByProductId = (productId, product, result) => {
    sql.query(
        UPDATE_BY_PRODUCT_ID,
        [
            product.productGroupId, product.productCode, product.productBarcode, product.productMeasureUnitId, product.productTaxGroupId,
            product.productRetailPrice, product.productDeliveryPrice, product.productName, product.productDescription, productId
        ],
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
            result(null, { productId, ...product });
        });
};

Product.deleteByProductId = (productId, result) => {
    sql.query(
        DELETE_BY_PRODUCT_ID,
        productId,
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
            result(null, productId);
        }
    );
}

module.exports = Product