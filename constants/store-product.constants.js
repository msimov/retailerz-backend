
const storeConstants = require("./store.constants")
const productConstants = require("./product.constants")

const STORE_COLUMNS = storeConstants.COLUMNS
const PRODUCT_COLUMNS = productConstants.COLUMNS

exports.COLUMNS = `\
storesProductsTable.id AS storeProductId, \
storesProductsTable.store_id AS storeProductStoreId, \
storesProductsTable.product_id AS storeProductProductId\
`

exports.CREATE = `\
INSERT INTO retailerz.stores_products (store_id, product_id) \
VALUES (?, ?)\
`

exports.GET_ALL_BY_STORE_ID = `\
SELECT ${this.COLUMNS}, ${STORE_COLUMNS}, ${PRODUCT_COLUMNS} \
FROM stores_products as storesProductsTable \
LEFT JOIN retailerz.stores as storesTable \
ON storesProductsTable.store_id = storesTable.id
LEFT JOIN retailerz.products as productsTable \
ON storesProductsTable.product_id = productsTable.id \
WHERE store_id = ?\
`

exports.GET_ALL_BY_PRODUCT_ID = `\
SELECT ${this.COLUMNS}, ${STORE_COLUMNS}, ${PRODUCT_COLUMNS} \
FROM stores_products as storesProductsTable \
LEFT JOIN retailerz.stores as storesTable \
ON storesProductsTable.store_id = storesTable.id
LEFT JOIN retailerz.products as productsTable \
ON storesProductsTable.product_id = productsTable.id \
WHERE product_id = ?\
`

exports.DELETE_BY_STORE_ID_AND_PRODUCT_ID = `\
DELETE FROM retailerz.stores_products \
WHERE store_id = ? \
AND product_id = ?\
`