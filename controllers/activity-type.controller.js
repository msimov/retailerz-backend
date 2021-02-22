const ActivityType = require("../models/activity-type.model");

exports.getAll = (req, res) => {
    ActivityType.getAll(
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