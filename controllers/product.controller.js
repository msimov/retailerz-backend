const Product = require("../models/product.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    Product.create(
        new Product(req.body),
        (err, data) => {
            if(err) {
                res.status(500).send({
                    message: 
                        err.message || "An error occurred while creating the product."
                });
            } else {
                res.send(data);
            }
        }
    );
};

exports.findById = (req, res) => {
    Product.findById(
        req.params.productId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Product with id ${req.params.productId} not found.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || `An error occurred while getting product with id ${req.params.productId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.getAll = (req, res) => {
    Product.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the products."
            });
        } else {
            res.send(data);
        }
    });
};

exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Product with id ${req.params.userId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating product with id ${req.params.userId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
};

exports.deleteById = (req, res) => {
    Product.deleteById(
        req.params.productId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `Product with id ${req.params.productId} not found.`
                    })
                } else {
                    res.status(500).send({
                        message: err.message || `An error occurred while deleting product with id ${req.params.productId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};