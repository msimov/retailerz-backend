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
    this.expiryDate = product.expiryDate;
    this.store = product.store;
};

Product.create = (userId, newProduct, result) => {
    sql.query(
         `INSERT INTO products (products.name, products.group, products.description, products.code, products.barcode, products.measureUnit, products.taxGroup, products.retailPrice, products.deliveryPrice, products.expiryDate, products.store, products.user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, "%Y-%m-%d"), ?, ?)`,
        [
            newProduct.name, newProduct.group, newProduct.description, newProduct.code,
            newProduct.barcode, newProduct.measureUnit, newProduct.taxGroup, newProduct.retailPrice,
            newProduct.deliveryPrice, newProduct.expiryDate, newProduct.store, userId
        ],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created product: ", { id: res.insertId, ...newProduct });
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
                console.log("Found product: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
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
            
            console.log("Products: ", res);
            result(null, res);
        }
    );
};

Product.updateById = (userId, productId, product, result) => {
    sql.query(
        `UPDATE products SET name = ?, products.group = ?, description = ?, products.code = ?, barcode = ?, measureUnit = ?, taxGroup = ?, retailPrice = ?, deliveryPrice = ?, expiryDate = ?, store = ? WHERE user = ? AND id = ?`,
        [
            newProduct.name, newProduct.group, newProduct.description, newProduct.code,
            newProduct.barcode, newProduct.measureUnit, newProduct.taxGroup, newProduct.retailPrice,
            newProduct.deliveryPrice, newProduct.expiryDate, newProduct.store, userId, productId
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

            console.log("Updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
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
            console.log("Deleted product with id: ", productId);
            result(null, productId);
        }
    );
}

module.exports = Product