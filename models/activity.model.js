const {
  CREATE,
  GET_ALL_BY_USER_ID,
  DELETE_BY_ACTIVITY_ID,
} = require("../constants/activity.constants");
const sql = require("./db");

const Activity = function (activity) {
  this.activityId = activity.activityId;
  this.activityUserId = activity.activityUserId;
  this.activityProductId = activity.activityProductId;
  this.activityActivityTypeId = activity.activityActivityTypeId;
};

Activity.create = (activityUserId, activity, result) => {
  sql.query(
    CREATE,
    [
      activityUserId,
      activity.activityProductId,
      activity.activityActivityTypeId,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { activityId: res.insertId, activityUserId, ...activity });
    }
  );
};

Activity.getAllByUserId = (activityUserId, result) => {
  sql.query(GET_ALL_BY_USER_ID, activityUserId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Activity.deleteByActivityId = (activityId, result) => {
  sql.query(DELETE_BY_ACTIVITY_ID, activityId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, activityId);
  });
};

module.exports = Activity;
