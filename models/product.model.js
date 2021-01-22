const { CREATE, FIND_BY_PRODUCT_ID, FIND_BY_KEYOWОRD, GET_ALL_BY_USER_ID, UPDATE_BY_PRODUCT_ID, DELETE_BY_PRODUCT_ID } = require('../constants/product.constants');
const sql = require('./db');

const Product = function(product) {
    this.productId = product.productId;
    this.userId = product.userId;
    this.groupId = product.groupId;
    this.code = product.code;
    this.barcode = product.barcode;
    this.measureUnitId = product.measureUnitId;
    this.taxGroupId = product.taxGroupId;
    this.retailPrice = product.retailPrice;
    this.deliveryPrice = product.deliveryPrice;
    this.name = product.name;
    this.description = product.description;
};

Product.create = (userId, product, result) => {
    sql.query(
        CREATE,
        [
            userId, product.groupId, product.code, product.barcode, product.measureUnitId, 
            product.taxGroupId, product.retailPrice, product.deliveryPrice, product.name, product.description
        ],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { productId: res.insertId, ...product });
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

Product.findByKeyword = (keyword, result) => {
    sql.query(
        FIND_BY_KEYOWОRD(keyword),
        keyword,
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

Product.getAllByUserId = (userId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
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

Product.updateByProductId = (productId, product, result) => {
    sql.query(
        UPDATE_BY_PRODUCT_ID,
        [
            product.groupId, product.code, product.barcode, product.measureUnitId, product.taxGroupId,
            product.retailPrice, product.deliveryPrice, product.name, product.description, productId
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