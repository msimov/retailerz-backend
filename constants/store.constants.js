const userConstants = require("./user.constants");
const USER_COLUMNS = userConstants.COLUMNS;

exports.COLUMNS = `\
storesTable.id AS storeId, \
storesTable.name AS storeName, \
storesTable.address AS storeAddress, \
storesTable.user_id AS storeUserId, \
storesTable.lat AS storeLat, \
storesTable.lng AS storeLng\
`;

exports.CREATE = `\
INSERT INTO stores (user_id, name, address, lat, lng) \
VALUES (?, ?, ?, ?, ?)\
`;

exports.FIND_BY_STORE_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM stores AS storesTable \
LEFT JOIN users AS usersTable \
ON storesTable.user_id = usersTable.id \
WHERE storesTable.id = ?\
`;

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS} \
FROM stores AS storesTable \
LEFT JOIN users AS usersTable \
ON storesTable.user_id = usersTable.id \
WHERE storesTable.user_id = ?\
`;

exports.UPDATE_BY_STORE_ID = `\
UPDATE stores \
SET name = ?, address = ?, lat = ?, lng = ? \
WHERE id = ?\
`;

exports.DELETE_BY_STORE_ID = `\
DELETE FROM stores \
WHERE id = ?\
`;
