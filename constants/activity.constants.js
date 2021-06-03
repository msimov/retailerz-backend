exports.CREATE = `\
INSERT INTO activities (user_id, product_id, activity_type_id) \
VALUES (?, ?, ?)\
`;
