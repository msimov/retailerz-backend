const userConstants = require("./user.constants")

const USER_COLUMNS = userConstants.COLUMNS

exports.COLUMNS = `\
groupsTable.id AS groupId, \
groupsTable.name AS groupName, \
groupsTable.user_id AS groupUserId\
`

exports.CREATE = `\
INSERT INTO retailerz.groups (user_id, name) \
VALUES (?, ?)\
`

exports.FIND_BY_GROUP_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM retailerz.groups AS groupsTable \
LEFT JOIN retailerz.users AS usersTable \
ON groupsTable.user_id = usersTable.id \
WHERE groupsTable.id = ?\
`

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM retailerz.groups AS groupsTable \
LEFT JOIN retailerz.users AS usersTable \
ON groupsTable.user_id = usersTable.id \
WHERE groupsTable.user_id = ?\
`

exports.UPDATE_BY_GROUP_ID = `\
UPDATE retailerz.groups \
SET name = ? \
WHERE id = ?\
`

exports.DELETE_BY_GROUP_ID = `\
DELETE FROM retailerz.groups \
WHERE id = ?\
`
