exports.COLUMNS = `\
operationTypesTable.id AS operationTypeId, \
operationTypesTable.name AS operationTypeName\
`

exports.FIND_BY_OPERATION_TYPE_ID = `\
SELECT ${this.COLUMNS} \
FROM retailerz.operationTypes AS operationTypesTable \
WHERE measureUnitsTable.id = ?\
`

exports.GET_ALL = `\
SELECT ${this.COLUMNS} \
FROM retailerz.operationTypes AS operationTypesTable\
`