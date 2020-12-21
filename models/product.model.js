const sql = require('./db');

const Product = function(product) {
    this.name = product.name;
    this.group = product.group;
    this.description = product.description;
    this.code = product.code;
    this.barcode = product.barcode;
    this.measureUnit = product.measureUnit;
    this.purchasePrice = product.purchasePrice;
    this.retailPrice = product.retailPrice;
    this.user = product.user;
};

Product.create = (newProduct, result) => {
    sql.query(
        `INSERT INTO products (name, products.group, description, products.code, barcode, measure_unit, purchase_price, retail_price, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            newProduct.name, newProduct.group, newProduct.description, newProduct.code,
            newProduct.barcode, newProduct.measureUnit, newProduct.purchasePrice, newProduct.retailPrice,
            newProduct.user
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

Product.findById = (productId, result) => {
    sql.query(
        `SELECT * FROM products WHERE id = ?`,
        productId,
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

Product.getAll = result => {
    sql.query(
        "SELECT * FROM products",
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

Product.updateById = (id, product, result) => {
    sql.query(
        `UPDATE products SET name = ?, products.group = ?, description = ?, products.code = ?, barcode = ?, measure_unit = ?, purchase_price = ?, retail_price = ? WHERE id = ?`,
        [
            product.name, product.group, product.description, product.code,
            product.barcode, product.measureUnit, product.purchasePrice, product.retailPrice,
            id
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

Product.deleteById = (id, result) => {
    sql.query(
        `DELETE FROM products WHERE id = ?`,
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
            console.log("Deleted product with id: ", id);
            result(null, id);
        }
    );
}

module.exports = Product