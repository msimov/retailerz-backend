const User = require("../models/user.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type
    });

    User.create(user, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the user."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: `User with id ${req.params.userId} not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || `An error occurred while getting user with id ${req.params.userId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the users."
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

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `User with id ${req.params.userId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating user with id ${req.params.userId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
}

exports.deleteById = (req, res) => {
    User.deleteById(req.params.userId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `User with id ${req.params.userId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting user with id ${req.params.userId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}