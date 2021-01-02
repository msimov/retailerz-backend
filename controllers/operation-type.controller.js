const OperationType = require("../models/operation-type.model");

exports.findById = (req, res) => {
    OperationType.findById(
        req.params.operationTypeId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Operation type with id ${req.params.operationTypeId} not found.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || `An error occurred while getting operation type with id ${req.params.operatinTypeId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.getAll = (req, res) => {
    OperationType.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the operation types."
            });
        } else {
            res.send(data);
        }
    });
};