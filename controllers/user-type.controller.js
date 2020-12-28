const UserType = require("../models/user-type.model");
const User = require("../models/user.model");

exports.findById = (req, res) => {
    UserType.findById(
        req.params.userTypeId,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `User type with id ${req.params.userTypeId} not found.`
                    });
                } else {
                    res.status(500).send({
                        message:
                            err.message || `An error occurred while getting user type with id ${req.params.userTypeId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};

exports.getAll = (req, res) => {
    UserType.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the user types."
            });
        } else {
            res.send(data);
        }
    });
};