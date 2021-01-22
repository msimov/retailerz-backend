const UserType = require("../models/user-type.model");

exports.findByUserTypeId = (req, res) => {
    UserType.findByUserTypeId(
        req.params.userTypeId,
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
    UserType.getAll(
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