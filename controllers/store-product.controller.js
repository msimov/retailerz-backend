const StoreProduct = require("../models/store-product.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }
    StoreProduct.create(
        req.params.storeId,
        req.body,
        (err, data) => {
            if(err) {
                res.status(500).send({
                    message: 
                        err.message || "Error."
                });
            } else {
                res.send(data);
            }
        }
    );
};

exports.getAllByStoreId = (req, res) => {
    StoreProduct.getAllByStoreId(
        req.params.storeId,
        (err, data) => {
            if(err) {
                res.status(500).send({
                    message:
                        err.message || "Error."
                });
            } else {
                res.send(data);
            }
        }
    );
};

exports.deleteByStoreIdAndProductId = (req, res) => {
    StoreProduct.deleteByStoreIdAndProductId(
        req.params.storeId,
        req.params.productId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: "Error."
                    })
                } else {
                    res.status(500).send({
                        message: err.message || "Error."
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
}