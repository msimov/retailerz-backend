const Report = require("../models/report.model");

exports.totalProfit = (req, res) => {
  Report.totalProfit(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.totalProfitForStore = (req, res) => {
  Report.totalProfitForStore(
    req.params.userId,
    req.params.storeId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.totalProfitForProduct = (req, res) => {
  Report.totalProfitForProduct(
    req.params.userId,
    req.params.productId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.totalProfitForProductForStore = (req, res) => {
  Report.totalProfitForProductForStore(
    req.params.userId,
    req.params.storeId,
    req.params.productId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.mostSearchedProducts = (req, res) => {
  Report.mostSearchedProducts(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.salesByDates = (req, res) => {
  Report.salesByDates(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.salesByDatesForStore = (req, res) => {
  Report.salesByDatesForStore(
    req.params.userId,
    req.params.storeId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.quantitySoldForProduct = (req, res) => {
  Report.quantitySoldForProduct(
    req.params.userId,
    req.params.productId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.quantitySoldForProductForStore = (req, res) => {
  Report.quantitySoldForProductForStore(
    req.params.userId,
    req.params.storeId,
    req.params.productId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};

exports.deliveriesByProductGroup = (req, res) => {
  Report.deliveriesByProductGroup(
    req.params.userId,
    req.params.groupId,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error.",
        });
      } else {
        res.send(data);
      }
    }
  );
};
