const StoreProduct = require("../models/store-product.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const storeProduct = new StoreProduct({
        productId: req.body.productId,
    });

    StoreProduct.create(req.params.userId, req.params.storeId, storeProduct, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the store product."
            });
        } else {
            res.send(data);
        }
    });
};

exports.getAllByStoreId = (req, res) => {
    StoreProduct.getAllByStoreId(req.params.userId, req.params.storeId, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the store products."
            });
        } else {
            res.send(data);
        }
    });
};

exports.deleteByProductId = (req, res) => {
    StoreProduct.deleteByStoreIdAndProductId(req.params.userId, req.params.storeId, req.params.productId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Product with id ${req.params.productId} in store with id ${req.params.storeId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting product with id ${req.params.productId} from store with id ${req.params.storeId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}