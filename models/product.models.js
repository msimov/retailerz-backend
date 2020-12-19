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
};

Product.create = (newProduct, result) => {
    sql.query(
        `INSERT INTO products 
        (
            name, group, description, code,
            barcode, measure_unit, purchase_price, retail_price
        ) 
        VALUES 
        (
            ${newProduct.name}, ${newProduct.group}, ${newProduct.description}, ${newProduct.code},
            ${newProduct.barcode}, ${newProduct.measureUnit}, ${newProduct.purchasePrice}, ${newProduct.retailPrice}
        )`,
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
        `SELECT * FROM products WHERE id = ${productId}`,
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
    name, group, description, code,
    barcode, measure_unit, purchase_price, retail_price
    sql.query(
        `UPDATE products SET 
            name = ${product.name}, group = ${product.group}, description = ${product.description}, code = ${product.core},
            barcode = ${product.barcode}, measure_unit = ${product.measureUnit}, purchase_price = ${product.purchasePrice},
            retail_price = ${product.retailPrice}`,
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
        `DELETE FROM products WHERE id = ${id}`,
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