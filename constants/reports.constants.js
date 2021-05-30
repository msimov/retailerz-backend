const groupConstants = require("./group.constants");
const productConstants = require("./product.constants");

const GROUP_COLUMNS = groupConstants.COLUMNS;
const PRODUCT_COLUMNS = productConstants.COLUMNS;

exports.TOTAL_PROFIT = `\
SELECT SUM(T.product_profit) as totalProfit from ( \
SELECT productsTable.id, (SUM(operationsTable.count) * productsTable.retail_price) - (SUM(operationsTable.count) * productsTable.delivery_price) AS product_profit \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
WHERE operationsTable.user_id = ? \
AND operationTypesTable.name = 'SALE' \
GROUP BY operationsTable.product_id \
) as T\
`;

exports.TOTAL_PROFIT_FOR_STORE = `\
SELECT SUM(T.product_profit) as totalProfit from ( \
SELECT productsTable.id, (SUM(operationsTable.count) * productsTable.retail_price) - (SUM(operationsTable.count) * productsTable.delivery_price) AS product_profit \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.products AS productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types AS operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
WHERE operationsTable.user_id = ? \
AND operationsTable.store_id = ? \
AND operationTypesTable.name = 'SALE' \
GROUP BY operationsTable.product_id \
) as T\
`;

exports.TOTAL_PROFIT_FOR_PRODUCT = `\
SELECT (SUM(operationsTable.count) * productsTable.retail_price) - (SUM(operationsTable.count) * productsTable.delivery_price) AS totalProfit \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.products as productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types as operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
WHERE operationsTable.user_id = ? \
AND operationsTable.product_id = ? \
AND operationTypesTable.name = 'SALE' \
GROUP BY operationsTable.product_id \
`;

exports.TOTAL_PROFIT_FOR_PRODUCT_FOR_STORE = `\
SELECT (SUM(operationsTable.count) * productsTable.retail_price) - (SUM(operationsTable.count) * productsTable.delivery_price) AS totalProfit \
FROM retailerz.operations AS operationsTable \
LEFT JOIN retailerz.products as productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.operation_types as operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
WHERE operationsTable.user_id = ? \
AND operationsTable.store_id = ? \
AND operationsTable.product_id = ? \
AND operationTypesTable.name = 'SALE' \
GROUP BY operationsTable.product_id \
`;

exports.MOST_SEARCHED_PRODUCTS = `\
SELECT ${PRODUCT_COLUMNS}, COUNT(productsTable.id) AS searchCount \
FROM retailerz.activities AS activitiesTable \
LEFT JOIN retailerz.products as productsTable \
ON activitiesTable.product_id = productsTable.id \
WHERE productsTable.user_id = ? \
GROUP BY productsTable.id \
ORDER BY searchCount DESC \
LIMIT 10\
`;

exports.SALES_BY_DATES = `\
SELECT datesTable.date, COUNT(operationsTable.id) AS sales \
FROM ( \
SELECT CURDATE() + INTERVAL 1 DAY - INTERVAL daysTable.id DAY as 'date' \
FROM retailerz.days as daysTable \
WHERE daysTable.id <= 10 \
) as datesTable \
LEFT JOIN retailerz.operations as operationsTable \
ON DATEDIFF(datesTable.date, operationsTable.creation_datetime) = 0 \
AND operationsTable.operation_type_id = 1 \
AND operationsTable.user_id = ? \
GROUP BY datesTable.date\
`;

exports.SALES_BY_DATES_FOR_STORE = `\
SELECT datesTable.date, COUNT(operationsTable.id) AS sales \
FROM ( \
SELECT CURDATE() + INTERVAL 1 DAY - INTERVAL daysTable.id DAY as 'date' \
FROM retailerz.days as daysTable \
WHERE daysTable.id <= 10 \
) as datesTable \
LEFT JOIN retailerz.operations as operationsTable \
ON DATEDIFF(datesTable.date, operationsTable.creation_datetime) = 0 \
AND operationsTable.operation_type_id = 1 \
AND operationsTable.user_id = ? \
AND operationsTable.store_id = ? \
GROUP BY datesTable.date\
`;

exports.QUANTITY_SOLD_FOR_PRODUCT = `\
SELECT SUM(operationsTable.count) AS sales \
FROM retailerz.operations as operationsTable \
LEFT JOIN retailerz.operation_types as operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.products as productsTable \
ON operationsTable.product_id = productsTable.id \
WHERE operationsTable.user_id = ? \
AND operationsTable.product_id = ? \
AND operationTypesTable.name = 'SALE' \
GROUP BY operationsTable.product_id\
`;

exports.QUANTITY_SOLD_FOR_PRODUCT_FOR_STORE = `\
SELECT SUM(operationsTable.count) AS sales \
FROM retailerz.operations as operationsTable \
LEFT JOIN retailerz.operation_types as operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.products as productsTable \
ON operationsTable.product_id = productsTable.id \
WHERE operationsTable.user_id = ? \
AND operationsTable.store_id = ? \
AND operationsTable.product_id = ? \
AND operationTypesTable.name = 'SALE' \
GROUP BY operationsTable.product_id\
`;

exports.DELIVERIES_BY_PRODUCT_GROUP = `\
SELECT SUM(operationsTable.count) as deliveries \
FROM retailerz.operations as operationsTable \
LEFT JOIN retailerz.operation_types as operationTypesTable \
ON operationsTable.operation_type_id = operationTypesTable.id \
LEFT JOIN retailerz.products as productsTable \
ON operationsTable.product_id = productsTable.id \
LEFT JOIN retailerz.groups AS groupsTable \
ON productsTable.group_id = groupsTable.id \
WHERE operationsTable.user_id = ? \
AND groupsTable.id = ?
AND operationTypesTable.name = 'DELIVERY' \
GROUP BY groupsTable.id \
`;
