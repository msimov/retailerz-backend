exports.COLUMNS = `\
taxGroupsTable.id AS taxGroupId, \
taxGroupsTable.percentage AS taxGroupPercentage\
`;

exports.FIND_BY_TAX_GROUP_ID = `\
SELECT ${this.COLUMNS} \
FROM retailerz.tax_groups AS taxGroupsTable \
WHERE taxGroupsTable.id = ?\
`;

exports.GET_ALL = `\
SELECT ${this.COLUMNS} \
FROM retailerz.tax_groups AS taxGroupsTable\
`;
