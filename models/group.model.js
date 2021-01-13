const sql = require('./db');

const Group = function(group) {
    this.name = group.name;
};

Group.create = (userId, newGroup, result) => {
    sql.query(
        `INSERT INTO retailerz.groups (user , name) VALUES (?, ?)`,
        [userId, newGroup.name],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newGroup });
        }
    );
};

Group.findById = (userId, groupId, result) => {
    sql.query(
        `SELECT * FROM retailerz.groups WHERE user = ? AND id = ?`,
        [userId, groupId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

Group.getAll = (userId, result) => {
    sql.query(
        "SELECT * FROM retailerz.groups WHERE user = ?",
        userId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

Group.updateById = (userId, groupId, group, result) => {
    sql.query(
        `UPDATE retailerz.groups SET name = ? WHERE user = ? AND id = ?`,
        [group.name, userId, groupId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { groupId, ...group });
        }
    );
};

Group.deleteById = (userId, groupId, result) => {
    sql.query(
        `DELETE FROM retailerz.groups WHERE user = ? AND id = ?`,
        [userId, groupId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, groupId);
        }
    );
}

module.exports = Group