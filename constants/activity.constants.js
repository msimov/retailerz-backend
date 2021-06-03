const productConstants = require("./product.constants");
const activityTypeConstants = require("./activity-type.constants");

const PRODUCT_COLUMNS = productConstants.COLUMNS;
const ACTIVITY_TYPE_COLUMNS = activityTypeConstants.COLUMNS;

exports.COLUMNS = `\
activitiesTable.id AS activityId, \
activitiesTable.activity_type_id AS activityActivityTypeId, \
activitiesTable.user_id AS activityUserId\
`;

exports.CREATE = `\
INSERT INTO activities (user_id, product_id, activity_type_id) \
VALUES (?, ?, ?)\
`;

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${PRODUCT_COLUMNS}, ${ACTIVITY_TYPE_COLUMNS} \
FROM activities AS activitiesTable \
LEFT JOIN products AS productsTable \
ON activitiesTable.product_id = productsTable.id \
LEFT JOIN activity_types AS activityTypesTable \
ON activitiesTable.activity_type_id = activityTypesTable.id \
WHERE activitiesTable.user_id = ?\
`;

exports.DELETE_BY_ACTIVITY_ID = `\
DELETE FROM activities \
WHERE id = ?\
`;
