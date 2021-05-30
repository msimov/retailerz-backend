const MeasureUnit = require("../models/measure-unit.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  MeasureUnit.create(req.params.userId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByMeasureUnitId = (req, res) => {
  MeasureUnit.findByMeasureUnitId(req.params.measureUnitId, (err, data) => {
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
  MeasureUnit.getAllByUserId(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateByMeasureUnitId = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  MeasureUnit.updateByMeasureUnitId(
    req.params.measureUnitId,
    req.body,
    (err, data) => {
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
    }
  );
};
exports.deleteByMeasureUnitId = (req, res) => {
  MeasureUnit.deleteByMeasureUnitId(req.params.measureUnitId, (err, data) => {
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
