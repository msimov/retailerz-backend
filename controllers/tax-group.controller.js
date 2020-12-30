const TaxGroup = require("../models/tax-group.model");

exports.findById = (req, res) => {
    TaxGroup.findById(
        req.params.taxGroupId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Tax group with id ${req.params.taxGroupId} not found.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || `An error occurred while getting tax group with id ${req.params.taxGroupId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.getAll = (req, res) => {
    TaxGroup.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the tax groups."
            });
        } else {
            res.send(data);
        }
    });
};