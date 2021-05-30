const TaxGroup = require("../models/tax-group.model");

exports.findByTaxGroupId = (req, res) => {
  TaxGroup.findByTaxGroupId(req.params.taxGroupId, (err, data) => {
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
  TaxGroup.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};
