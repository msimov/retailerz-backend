const User = require("../models/user.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  User.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByUserId = (req, res) => {
  User.findByUserId(req.params.userId, (err, data) => {
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

exports.getAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateByUserId = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }

  User.updateByUserId(req.params.userId, req.body, (err, data) => {
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

exports.deleteByUserId = (req, res) => {
  User.deleteByUserId(req.params.userId, (err, data) => {
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
