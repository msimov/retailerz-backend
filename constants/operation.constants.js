const userConstants = require("./user.constants")
const productConstants = require("./product.constants")
const operationTypeConstants = require("./operation-type.constants")
const storeConstants = require("./store.constants")

const USER_COLUMNS = userConstants.COLUMNS
const PRODUCT_COLUMNS = productConstants.COLUMNS
const OPERATION_TYPE_COLUMNS = operationTypeConstants.COLUMNS
const STORE_COLUMNS = storeConstants.COLUMNS

exports.COLUMNS = `\
operationsTable.id AS operationId, \
operationsTable.user_id AS operationUserId, \
operationsTable.product_id AS operationProductId, \
operationsTable.count AS operationCount, \
operationsTable.operation_type_id AS operationOperationTypeId, \
operationsTable.store_id AS operationStoreId\
`

exports.CREATE = `\
INSERT INTO retailerz.operations (user_id, product_id, count, operation_type_id, store_id) \
VALUES (?, ?, ?, ?, ?)\
`

exports.FIND_BY_OPERATION_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${PRODUCT_COLUMNS}, ${OPERATION_TYPE_COLUMNS}, ${STORE_COLUMNS} \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.users AS usersTable \
ON operationsTable.user_id = usersTable.id \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.stores AS storesTable \
ON operationsTable.store_id = storesTable.id \
WHERE operationsTable.id = ?\
`

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${PRODUCT_COLUMNS}, ${OPERATION_TYPE_COLUMNS}, ${STORE_COLUMNS} \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.users AS usersTable \
ON operationsTable.user_id = usersTable.id \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.stores AS storesTable \
ON operationsTable.store_id = storesTable.id \
WHERE operationsTable.user_id = ?\
`

exports.GET_ALL_BY_USER_ID_AND_OPERATION_TYPE_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${PRODUCT_COLUMNS}, ${OPERATION_TYPE_COLUMNS}, ${STORE_COLUMNS} \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.users AS usersTable \
ON operationsTable.user_id = usersTable.id \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.stores AS storesTable \
ON operationsTable.store_id = storesTable.id \
WHERE operationsTable.user_id = ? \
AND operationsTable.operation_type_id = ?\
`
exports.UPDATE_BY_OPERATION_ID = `\
UPDATE retailerz.operations \
SET product_id = ?, count = ?, operation_type_id = ?, store_id = ? \
WHERE id = ?\
`

exports.DELETE_BY_OPERATION_ID = `\
DELETE FROM retailerz.operations \
WHERE id = ?\
`
