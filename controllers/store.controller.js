const Store = require("../models/store.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const store = new Store({
        location: req.body.location,
    });

    Store.create(req.params.userId, store, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the store."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    Store.findById(req.params.userId, req.params.storeId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: `Store with id ${req.params.storeId} not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || `An error occurred while getting store with id ${req.params.storeId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    Store.getAll(req.params.userId, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the stores."
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

    const store = new Store({
        location: req.body.location,
    });

    Store.updateById(
        req.params.userId,
        req.params.storeId,
        store,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Store with id ${req.params.storeId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating store with id ${req.params.storeId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
}

exports.deleteById = (req, res) => {
    Store.deleteById(req.params.userId, req.params.storeId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Store with id ${req.params.storeId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting store with id ${req.params.storeId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}