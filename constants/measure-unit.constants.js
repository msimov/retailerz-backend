const userConstants = require("./user.constants")

const USER_COLUMNS = userConstants.COLUMNS

exports.COLUMNS = `\
measureUnitsTable.id AS measureUnitId, \
measureUnitsTable.name AS measureUnitName, \
measureUnitsTable.user_id AS measureUnitUserId\
`

exports.CREATE = `\
INSERT INTO retailerz.measureUnits (user_id, name) \
VALUES (?, ?)\
`

exports.FIND_BY_MEASURE_UNIT_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM retailerz.measureUnits AS measureUnitsTable \
LEFT JOIN retailerz.users AS usersTable \
ON measureUnitsTable.user_id = usersTable.id \
WHERE measureUnitsTable.id = ?\
`

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} 
FROM retailerz.measureUnits AS measureUnitsTable 
LEFT JOIN retailerz.users AS usersTable"
ON measureUnitsTable.user_id = usersTable.id
WHERE measureUnitsTable.user_id = ?`

exports.UPDATE_BY_MEASURE_UNIT_ID = `\
UPDATE retailerz.measureUnits \
SET name = ? \
WHERE id = ?\
`

exports.DELETE_BY_MEASURE_UNIT_ID = `\
DELETE FROM retailerz.measureUnits \
WHERE id = ?\
`
