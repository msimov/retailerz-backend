const userTypeConstants = require("./user-types.constants");
const USER_TYPE_COLUMNS = userTypeConstants.COLUMNS;

exports.COLUMNS = `\
usersTable.id AS userId, \
usersTable.first_name AS userFirstName, \
usersTable.last_name AS userLastName, \
usersTable.user_type_id AS userUserTypeId\
`;

exports.CREATE = `\
INSERT INTO users (id, first_name, last_name, user_type_id) \
VALUES (?, ?, ?, ?)\
`;

exports.FIND_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_TYPE_COLUMNS} \
FROM users AS usersTable \
LEFT JOIN user_types as userTypesTable \
ON usersTable.user_type_id = userTypesTable.id \
WHERE usersTable.id = ?\
`;

exports.GET_ALL = `\
SELECT ${this.COLUMNS}, ${USER_TYPE_COLUMNS} \
FROM users AS usersTable\
LEFT JOIN user_types as userTypesTable \
ON usersTable.user_type_id = userTypesTable.id\
`;

exports.UPDATE_BY_USER_ID = `\
UPDATE users \
SET first_name = ?, last_name = ? \
WHERE id = ?\
`;

exports.DELETE_BY_USER_ID = `\
DELETE FROM users \
WHERE id = ?\
`;
