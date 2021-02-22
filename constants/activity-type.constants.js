exports.COLUMNS = `\
activityTypesTable.id AS activityTypeId, \
activityTypesTable.name AS activityTypeName\
`

exports.GET_ALL = `\
SELECT ${this.COLUMNS} \
FROM retailerz.activity_types AS activityTypesTable\
`