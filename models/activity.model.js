const { CREATE } = require('../constants/activity.constants');
const sql = require('./db');

const Activity = function(activity) {
    this.activityId = activity.activityId;
    this.activityUserId = activity.activityUserId;
    this.activityProductId = activity.activityProductId;
    this.activityActivityTypeId = activity.activityActivityTypeId;
};

Activity.create = (activityUserId, activity, result) => {
    sql.query(
        CREATE,
        [activityUserId, activity.activityProductId, activity.activityActivityTypeId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { activityId: res.insertId, activityUserId, ...activity });
        }
    );
};

module.exports = Activity