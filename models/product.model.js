const sql = require('./db');

const Product = function(product) {
    this.name = product.name;
    this.group = product.group;
    this.description = product.description;
    this.code = product.code;
    this.barcode = product.barcode;
    this.measureUnit = product.measureUnit;
    this.taxGroup = product.taxGroup;
    this.retailPrice = product.retailPrice;
    this.deliveryPrice = product.deliveryPrice;
};

Product.create = (userId, newProduct, result) => {
    sql.query(
         `INSERT INTO products (products.name, products.group, products.description, products.code, products.barcode, products.measureUnit, products.taxGroup, products.retailPrice, products.deliveryPrice, products.user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            newProduct.name, newProduct.group, newProduct.description, newProduct.code,
            newProduct.barcode, newProduct.measureUnit, newProduct.taxGroup, newProduct.retailPrice,
            newProduct.deliveryPrice, userId
        ],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newProduct });
        }
    );
};

Product.findById = (userId, productId, result) => {
    sql.query(
        `SELECT * FROM products WHERE user = ? AND id = ?`,
        [userId, productId],
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

Product.findByKeyword = (keyWord, result) => {
    sql.query(
        `SELECT * FROM products WHERE id LIKE "%${keyWord}%" OR products.group LIKE "%${keyWord}%" OR barcode LIKE "%${keyWord}%" OR name LIKE "%${keyWord}%" OR description LIKE "%${keyWord}%" OR products.user LIKE "%${keyWord}%"`,
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

Product.getAll = (userId, result) => {
    sql.query(
        "SELECT * FROM products WHERE user = ?",
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

Product.updateById = (userId, productId, newProduct, result) => {
    sql.query(
        `UPDATE products SET name = ?, products.group = ?, description = ?, products.code = ?, barcode = ?, measureUnit = ?, taxGroup = ?, retailPrice = ?, deliveryPrice = ? WHERE user = ? AND id = ?`,
        [
            newProduct.name, newProduct.group, newProduct.description, newProduct.code,
            newProduct.barcode, newProduct.measureUnit, newProduct.taxGroup, newProduct.retailPrice,
            newProduct.deliveryPrice, userId, productId
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
            result(null, { id: productId, ...newProduct });
        });
};

Product.deleteById = (userId, productId, result) => {
    sql.query(
        `DELETE FROM products WHERE user = ? AND id = ?`,
        [userId, productId],
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