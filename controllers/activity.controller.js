const Activity = require("../models/activity.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Activity.create(req.params.userId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};
