const Warehouse = require("../models/warehouse.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const warehouse = new Warehouse({
        location: req.body.location,
        user: req.body.user
    });

    Warehouse.create(warehouse, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the warehouse."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    Warehouse.findById(req.params.warehouseId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: `Warehouse with id ${req.params.warehouseId} not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || `An error occurred while getting warehouse with id ${req.params.warehouseId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    Warehouse.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the warehouses."
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

    Warehouse.updateById(
        req.params.warehouseId,
        new Warehouse(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Warehouse with id ${req.params.warehouseId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating warehouse with id ${req.params.warehouseId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
}

exports.deleteById = (req, res) => {
    Warehouse.deleteById(req.params.warehouseId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Warehouse with id ${req.params.warehouseId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting warehouse with id ${req.params.warehouseId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}