const Product = require("../models/product.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    Product.create(
        req.params.userId,
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

exports.findByProductId = (req, res) => {
    Product.findByProductId(
        req.params.productId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: "Error."
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Error."
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.findByKeyword = (req, res) => {
    Product.findByKeyword(
        req.query.keyword,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: "Error."
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || "Error."
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.getAllByUserId = (req, res) => {
    Product.getAllByUserId(
        req.params.userId,
        (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "Error."
            });
        } else {
            res.send(data);
        }
    });
};

exports.getAllRecommendedByUserId = (req, res) => {
    Product.getAllRecommendedByUserId(
        req.params.userId,
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
    )
}

exports.updateByProductId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }
    Product.updateByProductId(
        req.params.productId,
        req.body,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: "Error."
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || "Error."
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
};

exports.deleteByProductId = (req, res) => {
    Product.deleteByProductId(
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
};