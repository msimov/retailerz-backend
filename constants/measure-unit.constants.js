const userConstants = require("./user.constants");

const USER_COLUMNS = userConstants.COLUMNS;

exports.COLUMNS = `\
measureUnitsTable.id AS measureUnitId, \
measureUnitsTable.name AS measureUnitName, \
measureUnitsTable.user_id AS measureUnitUserId\
`;

exports.CREATE = `\
INSERT INTO measure_units (user_id, name) \
VALUES (?, ?)\
`;

exports.FIND_BY_MEASURE_UNIT_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM measure_units AS measureUnitsTable \
LEFT JOIN users AS usersTable \
ON measureUnitsTable.user_id = usersTable.id \
WHERE measureUnitsTable.id = ?\
`;

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM measure_units AS measureUnitsTable \
LEFT JOIN users AS usersTable \
ON measureUnitsTable.user_id = usersTable.id \
WHERE measureUnitsTable.user_id = ?\
`;

exports.UPDATE_BY_MEASURE_UNIT_ID = `\
UPDATE measure_units \
SET name = ? \
WHERE id = ?\
`;

exports.DELETE_BY_MEASURE_UNIT_ID = `\
DELETE FROM measure_units \
WHERE id = ?\
`;
