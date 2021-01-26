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

exports.FIND_BY_KEYOWОRD = (keyword) => `\
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
WHERE productsTable.name LIKE "%${keyword}%" \
OR productsTable.barcode LIKE "%${keyword}%" \
OR usersTable.first_name LIKE "%${keyword}%" \
OR usersTable.last_name LIKE "%${keyword}%" \
OR usersTable.email LIKE "%${keyword}%" \
OR groupsTable.name LIKE "%${keyword}%"\
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