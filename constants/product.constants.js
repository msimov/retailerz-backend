const userConstants = require("./user.constants")
const measureUnitConstants = require("./measure-unit.constants")
const groupConstants = require("./group.constants")
const taxGroupConstants = require("./tax-group.constants")

const USER_COLUMNS = userConstants.COLUMNS
const GROUP_COLUMNS = groupConstants.COLUMNS
const MEASURE_UNIT_COLUMNS = measureUnitConstants.COLUMNS
const TAX_GROUP_COLUMNS = taxGroupConstants.COLUMNS

exports.COLUMNS = `\
productsTable.id AS productId, \
productsTable.group_id AS productGroupId, \
productsTable.code AS productCode, \
productsTable.barcode AS productBarcode, \
productsTable.measure_unit_id AS productMeasureUnitId, \
productsTable.tax_group_id AS productTaxGroupId, \
productsTable.retail_price AS productRetailPrice, \
productsTable.delivery_price AS productDeliveryPrice, \
productsTable.name AS productName, \
productsTable.description AS productDescription, \
productsTable.user_id AS productUserId\
`

exports.CREATE = `\
INSERT INTO retailerz.products \
(user_id, group_id, code, barcode, measure_unit_id, tax_group_id, retail_price, delivery_price, name, description) \
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)\
`

exports.FIND_BY_PRODUCT_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${GROUP_COLUMNS}, ${MEASURE_UNIT_COLUMNS}, ${TAX_GROUP_COLUMNS} \
FROM retailerz.products AS productsTable \
LEFT JOIN retailerz.users AS usersTable \
ON productsTable.user_id = usersTable.id \
LEFT JOIN retailerz.groups AS groupsTable \
ON productsTable.group_id = groupsTable.id \
LEFT JOIN retailerz.measure_units AS measureUnitsTable \
ON productsTable.measure_unit_id = measureUnitsTable.id \
LEFT JOIN retailerz.tax_groups AS taxGroupsTable \
ON productsTable.tax_group_id = taxGroupsTable.id \
WHERE productsTable.id = ?\
`

exports.SEARCH = (search) => `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${GROUP_COLUMNS}, ${MEASURE_UNIT_COLUMNS}, ${TAX_GROUP_COLUMNS} \
FROM retailerz.products AS productsTable \
LEFT JOIN retailerz.users AS usersTable \
ON productsTable.user_id = usersTable.id \
LEFT JOIN retailerz.groups AS groupsTable \
ON productsTable.group_id = groupsTable.id \
LEFT JOIN retailerz.measure_units AS measureUnitsTable \
ON productsTable.measure_unit_id = measureUnitsTable.id \
LEFT JOIN retailerz.tax_groups AS taxGroupsTable \
ON productsTable.tax_group_id = taxGroupsTable.id \
WHERE productsTable.name LIKE "%${search}%" \
OR productsTable.barcode LIKE "%${search}%" \
OR usersTable.first_name LIKE "%${search}%" \
OR usersTable.last_name LIKE "%${search}%" \
OR groupsTable.name LIKE "%${search}%"\
`

exports.GET_ALL_BY_USER_ID = `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${GROUP_COLUMNS}, ${MEASURE_UNIT_COLUMNS}, ${TAX_GROUP_COLUMNS} \
FROM retailerz.products AS productsTable \
LEFT JOIN retailerz.users AS usersTable \
ON productsTable.user_id = usersTable.id \
LEFT JOIN retailerz.groups AS groupsTable \
ON productsTable.group_id = groupsTable.id \
LEFT JOIN retailerz.measure_units AS measureUnitsTable \
ON productsTable.measure_unit_id = measureUnitsTable.id \
LEFT JOIN retailerz.tax_groups AS taxGroupsTable \
ON productsTable.tax_group_id = taxGroupsTable.id \
WHERE productsTable.user_id = ?\
`
exports.GET_ALL_RECOMMENDED_BY_USER_ID = (userId) => `\
SELECT ${this.COLUMNS}, ${USER_COLUMNS}, ${GROUP_COLUMNS}, ${MEASURE_UNIT_COLUMNS}, ${TAX_GROUP_COLUMNS} FROM \
(\
SELECT product_id FROM \
(\
SELECT T1.user_id, count(T1.user_id) AS matches FROM \
(\
SELECT T2.user_id, T2.product_id, o5.user_id AS current_user_id, o5.product_id AS current_user_product_id FROM \
(\
SELECT o4.user_id, o4.product_id FROM \
(\
SELECT u2.id FROM \
(\
SELECT o3.user_id FROM \
(\
SELECT o2.product_id FROM operations o2 \
WHERE o2.user_id = "${userId}" \
GROUP BY o2.product_id\
) as T6 \
INNER JOIN operations o3 \
ON T6.product_id = o3.product_id\
) as T5 \
LEFT JOIN users u2 \
ON T5.user_id = u2.id \
WHERE u2.id != "${userId}" \
GROUP BY u2.id\
) as T4 \
INNER JOIN operations o4 \
ON T4.id = o4.user_id \
GROUP BY o4.product_id, o4.user_id\
) as T2 \
LEFT JOIN operations o5 \
ON o5.user_id = "${userId}" \
AND o5.product_id = T2.product_id \
WHERE o5.product_id IS NOT NULL AND o5.user_id IS NOT NULL\
) AS T1 \
GROUP BY T1.user_id, T1.current_user_id\
) AS T0 \
INNER JOIN operations o \
ON o.user_id = T0.user_id \
WHERE T0.matches >= 2 \
GROUP BY o.product_id\
) AS T \
LEFT JOIN retailerz.products AS productsTable
ON productsTable.id = T.product_id
LEFT JOIN retailerz.users AS usersTable \
ON productsTable.user_id = usersTable.id \
LEFT JOIN retailerz.groups AS groupsTable \
ON productsTable.group_id = groupsTable.id \
LEFT JOIN retailerz.measure_units AS measureUnitsTable \
ON productsTable.measure_unit_id = measureUnitsTable.id \
LEFT JOIN retailerz.tax_groups AS taxGroupsTable \
ON productsTable.tax_group_id = taxGroupsTable.id\
`

exports.UPDATE_BY_PRODUCT_ID = `\
UPDATE retailerz.products SET \
group_id = ?, code = ?, barcode = ?, measure_unit_id = ?, tax_group_id = ?, retail_price = ?, \
delivery_price = ?, name = ?, description = ? \
WHERE id = ?\
`

exports.DELETE_BY_PRODUCT_ID = `\
DELETE FROM retailerz.products \
WHERE id = ?\
`