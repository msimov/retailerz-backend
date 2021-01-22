const OperationType = require("../models/operation-type.model");

exports.findByOperationTypeId = (req, res) => {
    OperationType.findByOperationTypeId(
        req.params.operationTypeId,
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

exports.getAll = (req, res) => {
    OperationType.getAll(
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