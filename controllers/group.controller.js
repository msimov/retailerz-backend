const Group = require("../models/group.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Group.create(req.params.userId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByGroupId = (req, res) => {
  Group.findByGroupId(req.params.groupId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: "Error.",
        });
      } else {
        res.status(500).send({
          message: err.message || "Error.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.getAllByUserId = (req, res) => {
  Group.getAllByUserId(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateByGroupId = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Group.updateByGroupId(req.params.groupId, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: "Error.",
        });
      } else {
        res.status(400).send({
          message: err.message || "Error.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.deleteByGroupId = (req, res) => {
  Group.deleteByGroupId(req.params.groupId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Error.",
        });
      } else {
        res.status(500).send({
          message: err.message || "Error.",
        });
      }
    } else {
      res.send(data);
    }
  });
};
