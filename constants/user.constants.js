const userTypeConstants = require("./user-types.constants")
const USER_TYPE_COLUMNS = userTypeConstants.COLUMNS

exports.COLUMNS = `\
usersTable.id AS userId, \
usersTable.first_name AS userFirstName, \
usersTable.last_name AS userLastName, \
usersTable.email AS userEmail, \
usersTable.user_type_id AS userUserTypeId\
`

exports.CREATE = `\
INSERT INTO retailerz.users (id, first_name, last_name, email, user_type_id) \
VALUES (?, ?, ?, ?, ?)\
`

exports.FIND_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_TYPE_COLUMNS} \
FROM retailerz.users AS usersTable \
LEFT JOIN retailerz.user_types as userTypesTable \
ON usersTable.user_type_id = userTypesTable.id \
WHERE usersTable.id = ?\
`

exports.GET_ALL = `\
SELECT ${this.COLUMNS}, ${USER_TYPE_COLUMNS} \
FROM retailerz.users AS usersTable\
LEFT JOIN retailerz.user_types as userTypesTable \
ON usersTable.user_type_id = userTypesTable.id\
`

exports.UPDATE_BY_USER_ID = `\
UPDATE retailerz.users \
SET first_name = ?, last_name = ?, email = ? \
WHERE id = ?\
`

exports.DELETE_BY_USER_ID = `\
DELETE FROM retailerz.users \
WHERE id = ?\
`