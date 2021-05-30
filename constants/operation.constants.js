const userConstants = require("./user.constants");
const productConstants = require("./product.constants");
const operationTypeConstants = require("./operation-type.constants");
const storeConstants = require("./store.constants");
const measureUnitConstants = require("./measure-unit.constants");

const USER_COLUMNS = userConstants.COLUMNS;
const PRODUCT_COLUMNS = productConstants.COLUMNS;
const OPERATION_TYPE_COLUMNS = operationTypeConstants.COLUMNS;
const STORE_COLUMNS = storeConstants.COLUMNS;
const MEASURE_UNIT_COLUMNS = measureUnitConstants.COLUMNS;

exports.COLUMNS = `\
operationsTable.id AS operationId, \
operationsTable.user_id AS operationUserId, \
operationsTable.product_id AS operationProductId, \
operationsTable.count AS operationCount, \
operationsTable.operation_type_id AS operationOperationTypeId, \
operationsTable.store_id AS operationStoreId\
`;

exports.CREATE = `\
INSERT INTO retailerz.operations (user_id, product_id, count, operation_type_id, store_id, creation_datetime) \
VALUES (?, ?, ?, ?, ?, NOW())\
`;

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
`;

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${PRODUCT_COLUMNS}, ${OPERATION_TYPE_COLUMNS}, ${STORE_COLUMNS}, ${MEASURE_UNIT_COLUMNS} \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.users AS usersTable \
ON operationsTable.user_id = usersTable.id \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.stores AS storesTable \
ON operationsTable.store_id = storesTable.id \
LEFT JOIN retailerz.measure_units AS measureUnitsTable \
ON measureUnitsTable.id = productsTable.measure_unit_id \
WHERE operationsTable.user_id = ?\
`;

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
`;

exports.GET_INVENTORY = (userId) => `\
SELECT ${PRODUCT_COLUMNS}, ${STORE_COLUMNS},SUM(\
CASE \
WHEN operationTypesTable.name = "DELIVERY" THEN operationsTable.count \
WHEN operationTypesTable.name = "REFUND" THEN operationsTable.count \
WHEN operationTypesTable.name = "SALE" THEN -1 * operationsTable.count \
WHEN operationTypesTable.name = "ADD_TO_CART" THEN -1 * operationsTable.count \
ELSE 0 END\
) AS productCount \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.stores AS storesTable \
ON operationsTable.store_id = storesTable.id \
WHERE (\
CASE \
WHEN \
operationTypesTable.name != "ADD_TO_CART" \
AND operationsTable.user_id = '${userId}' \
THEN 1 \
WHEN operationTypesTable.name = "ADD_TO_CART" THEN 1 \
ELSE 0 END\
) AND productsTable.user_id = '${userId}' \
GROUP BY operationsTable.product_id, operationsTable.store_id\
`;

exports.UPDATE_BY_OPERATION_ID = `\
UPDATE retailerz.operations \
SET product_id = ?, count = ?, operation_type_id = ?, store_id = ? \
WHERE id = ?\
`;

exports.DELETE_BY_OPERATION_ID = `\
DELETE FROM retailerz.operations \
WHERE id = ?\
`;

exports.DELETE_BY_EXPIRED_TIME = `\
DELETE retailerz.operations FROM retailerz.operations \
LEFT JOIN retailerz.operation_types as operationTypesTable \
ON operation_type_id = operationTypesTable.id \
WHERE creation_datetime <= DATE_SUB(NOW(), INTERVAL 1 HOUR) \
AND operationTypesTable.name = "ADD_TO_CART"\
`;
