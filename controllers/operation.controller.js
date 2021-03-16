const Operation = require("../models/operation.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }
    Operation.create(
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

exports.findByOperationId = (req, res) => {
    Operation.findByOperationId(
        req.params.operationId,
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
    Operation.getAllByUserId(
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
    );
};

exports.getAllByUserIdAndOperationTypeId = (req, res) => {
    Operation.getAllByUserIdAndOperationTypeId(
        req.params.userId,
        req.params.operationTypeId,
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
}

exports.getInventory = (req, res) => {
    Operation.getInventory(
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
    );
}

exports.updateByOperationId = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }
    Operation.updateByOperationId(
        req.params.operationId,
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
}

exports.deleteByOperationId = (req, res) => {
    Operation.deleteByOperationId(
        req.params.operationId,
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

exports.deleteByExpiredTime = () => {
    Operation.deleteByExpiredTime();
}