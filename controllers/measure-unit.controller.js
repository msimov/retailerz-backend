const MeasureUnit = require("../models/measure-unit.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const measureUnit = new MeasureUnit({
        unit: req.body.unit,
    });

    MeasureUnit.create(req.params.userId, measureUnit, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the measure unit."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    MeasureUnit.findById(req.params.userId, req.params.measureUnitId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: `Measure unit with id ${req.params.measureUnitId} not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || `An error occurred while getting measure unit with id ${req.params.measureUnitId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    MeasureUnit.getAll(req.params.userId, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the measure units."
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

    const measureUnit = new MeasureUnit({
        unit: req.body.unit,
    });

    MeasureUnit.updateById(
        req.params.userId,
        req.params.measureUnitId,
        measureUnit,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Measure unit with id ${req.params.measureUnitId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating measure unit with id ${req.params.measureUnitId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
}

exports.deleteById = (req, res) => {
    MeasureUnit.deleteById(req.params.userId, req.params.measureUnitId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Measure unit with id ${req.params.measureUnitId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting measure unit with id ${req.params.measureUnitId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}