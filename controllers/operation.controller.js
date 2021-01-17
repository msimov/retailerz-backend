const Operation = require("../models/operation.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const operation = new Operation({
        operationType: req.body.operationType,
        store: req.body.store,
        product: req.body.product,
        count: req.body.count
    });

    Operation.create(req.params.userId, operation, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the operation."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    Operation.findById(req.params.userId, req.params.operationId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: `Operation with id ${req.params.operationId} not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || `An error occurred while getting operation with id ${req.params.operationId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    Operation.getAll(req.params.userId, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the operations."
            });
        } else {
            res.send(data);
        }
    });
};

exports.getAllByOperationType = (req, res) => {
    Operation.getAllByOperationType(req.params.userId, req.body.operationType, (res, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the operations."
            });
        } else {
            res.send(data);
        }
    });
}

exports.updateById = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const operation = new Operation({
        operationType: req.body.operationType,
        store: req.body.store,
        product: req.body.product,
        count: req.body.count
    });

    Operation.updateById(
        req.params.userId,
        req.params.operationId,
        operation,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Operation with id ${req.params.operationId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating OPERATION with id ${req.params.operationId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
}

exports.deleteById = (req, res) => {
    Operation.deleteById(req.params.userId, req.params.operationId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Operation with id ${req.params.operationId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting operation with id ${req.params.operationId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}