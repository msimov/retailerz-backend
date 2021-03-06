exports.COLUMNS = `\
userTypesTable.id AS userTypeId, \
userTypesTable.name AS userTypeName\
`;

exports.FIND_BY_USER_TYPE_ID = `\
SELECT ${this.COLUMNS} \
FROM user_types AS userTypesTable \
WHERE userTypesTable.id = ?\
`;

exports.GET_ALL = `\
SELECT ${this.COLUMNS} \
FROM user_types AS userTypesTable\
`;
