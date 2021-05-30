const Store = require("../models/store.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }

  Store.create(req.params.userId, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByStoreId = (req, res) => {
  Store.findByStoreId(req.params.storeId, (err, data) => {
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
  Store.getAllByUserId(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateByStoreId = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
  }
  Store.updateByStoreId(req.params.storeId, req.body, (err, data) => {
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

exports.deleteByStoreId = (req, res) => {
  Store.deleteByStoreId(req.params.storeId, (err, data) => {
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
