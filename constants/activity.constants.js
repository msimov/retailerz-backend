exports.CREATE = `\
INSERT INTO retailerz.activities (user_id, product_id, activity_type_id) \
VALUES (?, ?, ?)\
`