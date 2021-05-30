const { GET_ALL } = require("../constants/activity-type.constants");
const sql = require("./db");

const ActivityType = function (activityType) {
  this.activityTypeId = activityType.activityTypeId;
  this.activityTypeName = activityType.activityTypeName;
};

ActivityType.getAll = (result) => {
  sql.query(GET_ALL, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = ActivityType;
