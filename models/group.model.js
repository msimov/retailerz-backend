const { CREATE, FIND_BY_GROUP_ID, GET_ALL_BY_USER_ID, UPDATE_BY_GROUP_ID, DELETE_BY_GROUP_ID } = require('../constants/group.constants');
const sql = require('./db');

const Group = function(group) {
    this.name = group.name;
};

Group.create = (userId, newGroup, result) => {
    sql.query(
        CREATE,
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

Group.findById = (id, result) => {
    sql.query(
        FIND_BY_GROUP_ID,
        id,
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

Group.getAllByUserId = (userId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
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

Group.updateById = (id, group, result) => {
    sql.query(
        UPDATE_BY_GROUP_ID,
        [group.name, id],
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
            result(null, { id, ...group });
        }
    );
};

Group.deleteById = (id, result) => {
    sql.query(
        DELETE_BY_GROUP_ID,
        id,
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
            result(null, id);
        }
    );
}

module.exports = Group