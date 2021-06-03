exports.COLUMNS = `\
activityTypesTable.id AS activityTypeId, \
activityTypesTable.name AS activityTypeName\
`;

exports.GET_ALL = `\
SELECT ${this.COLUMNS} \
FROM activity_types AS activityTypesTable\
`;
