const Group = require("../models/group.model");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty."
        });
    }

    const group = new Group({
        name: req.body.name,
    });

    Group.create(req.params.userId, group, (err, data) => {
        if(err) {
            res.status(500).send({
                message: 
                    err.message || "An error occurred while creating the group."
            });
        } else {
            res.send(data);
        }
    });
};

exports.findById = (req, res) => {
    Group.findById(req.params.groupId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(400).send({
                    message: `Group with id ${req.params.groupId} not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || `An error occurred while getting group with id ${req.params.groupId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.getAll = (req, res) => {
    Group.getAllByUserId(req.params.userId, (err, data) => {
        if(err) {
            res.status(500).send({
                message:
                    err.message || "An error occurred while getting the groups."
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

    const group = new Group({
        name: req.body.name,
    });

    Group.updateById(
        req.params.userId,
        req.params.groupId,
        group,
        (err, data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(400).send({
                        message: `Group with id ${req.params.groupId} not found.`
                    });
                } else {
                    res.status(400).send({
                        message:
                        err.message || `An error occurred while updating group with id ${req.params.groupId}.`
                    });
                }
            } else {
                res.send(data);
            }
        }
    )
}

exports.deleteById = (req, res) => {
    Group.deleteById(req.params.userId, req.params.groupId, (err, data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Group with id ${req.params.groupId} not found.`
                })
            } else {
                res.status(500).send({
                    message: err.message || `An error occurred while deleting group with id ${req.params.groupId}.`
                });
            }
        } else {
            res.send(data);
        }
    });
}